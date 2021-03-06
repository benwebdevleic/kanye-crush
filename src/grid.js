import * as environment from './environment'
import { Tile } from './tile'
import { sendEvent } from './party'
import * as audio from './audio'
import { images } from './images'
import { objectIsInArray } from './utils'

var grid = []

var tileImages = []

var dragging = false
var dragStartX
var dragStartY
var draggingTile = { row: null, col: null }

var swappingTiles = []
var swappedTiles = []
var startSwapTime = null;

var bufferRowCount
var bufferHeight

var matches = []

var scalingFactor = environment.canvas.width / environment.canvas.clientWidth

const getEventCoordinates = event => {
  let mouseX
  let mouseY

  // handle the touch event differently to the mouse event because
  // for some reason the data is structured in a different way
  if (event.type === "touchstart" || event.type === "touchmove") {
    mouseX = event.touches[0].clientX - event.target.offsetLeft
    mouseY = event.touches[0].clientY - event.target.offsetTop
  } else {
    mouseX = event.offsetX
    mouseY = event.offsetY
  }

  return {
    mouseX,
    mouseY,
  }
}

/**
 * Handle the mousemove event
 *
 * If the user has the mouse button down and moves the mouse over another tile,
 * trigger the swap of the two tiles
 *
 * @param  {Object} event
 * @return {void}
 */
const handleMouseMove = function(event) {
  if (dragging) {

      const { mouseX, mouseY } = getEventCoordinates(event)

      const cellRow = Math.floor(((mouseY * scalingFactor) + bufferHeight) / environment.cellSize)
      const cellCol = Math.floor((mouseX * scalingFactor) / environment.cellSize)

      // if the mouse moves to a different tile
      if (draggingTile.row !== cellRow || draggingTile.col !== cellCol) {

        dragging = false

        // swap the tiles
        swappingTiles.push({ row: draggingTile.row, col: draggingTile.col })
        swappingTiles.push({ row: cellRow, col: cellCol })
      }
    }
}

/**
 * Handler for the mouse button being pressed
 *
 * Capture which cell the mouse pointer is over when the button is pressed
 *
 * @param  {Object} event
 * @return {void}
 */
const handleMouseDown = function(event) {
  dragging = true

  const { mouseX, mouseY } = getEventCoordinates(event)

  //scale the mouse co-ordinates to match the css scaled canvas element
  dragStartX = mouseX * scalingFactor
  dragStartY = mouseY * scalingFactor

  draggingTile.row = Math.floor((dragStartY + bufferHeight) / environment.cellSize)
  draggingTile.col = Math.floor(dragStartX / environment.cellSize)
}


/**
 * Handler for when the mouse button is released
 *
 * Cancel the action of the user dragging the mouse
 *
 * @param  {Object} event
 * @return {void}
 */
const handleMouseUp = function(event) {
  dragging = false
}

/**
 * Iterate through every cell in the grid
 *
 * @param  {Function} cb Callback function that's fired for every cell
 * @return {void}
 */
const parseGrid = cb => {

  let row;
  let col;

  // loop through the rows
  for (row = 0; row < grid.length; row += 1) {

    // loop through the cell in each row
    for (col = 0; col < grid[row].length; col += 1) {

      cb(row, col, grid[row][col])
    }
  }
}

/**
 * Render each tile in the grid
 *
 * @return {void}
 */
const render = () => {

  parseGrid((row, col, value) => {

    if (tileInCell(row, col)) {
      grid[row][col].render()
    }
  })
}

/**
 * Remove matches generated when the grid is first created
 *
 * @return {void}
 */
const clearNonUserMatches = () => {
  let matches = getMatches(true)
  while(matches.length) {
    removeTiles(matches, false)
    shiftTiles()
    fillEmptyCells()
    applyGravity(false)
    matches = getMatches(true)
  }
  sendEvent('resetscore')
}

/**
 * Initialise the grid.
 *
 * Creates the grid, preloads images and binds mouse events.
 *
 * @param  {Function} cb Callback function that's called when the grid has been initialised
 * @return {void}
 */
const init = (cb) => {

  environment.setCellSize(environment.canvas.width / environment.numColumns)

  bufferRowCount = environment.numRows

  environment.canvas.addEventListener("mousedown", handleMouseDown)
  environment.canvas.addEventListener("mousemove", handleMouseMove)
  environment.canvas.addEventListener("mouseup", handleMouseUp)

  environment.canvas.addEventListener("touchstart", handleMouseDown)
  environment.canvas.addEventListener("touchmove", handleMouseMove)
  environment.canvas.addEventListener("touchend", handleMouseUp)

  tileImages = [
    images['coin-gold'],
    images['coin-silver'],
    images['coin-bronze'],
    images['coin-pink'],
    images['coin-green'],
    images['coin-red'],
  ]

  // create a grid of tiles
  createGrid(environment.map)

  // clear matches accidentally created
  clearNonUserMatches()

  cb()
}

/**
 * Clear the canvas element
 *
 * @return {void}
 */
const clearCanvas = () => {
  environment.ctx.clearRect(0, 0, environment.canvas.width, environment.canvas.height)
}

/**
 * Swap two adjacent tiles in the grid
 *
 * @return Object Array containing tiles that have been swapped when they have finished swapping. The array is empty at all other times
 */
const swapTiles = () => {

  // bail if tiles aren't currently being swapped
  if (!swappingTiles.length) {
    return
  }

  let tiles = swappingTiles

  // capture the current time because the tiles need to know when the
  // animation was triggered
  if (startSwapTime === null) {
    startSwapTime = Date.now()
  }

  const duration = 200

  grid[tiles[0].row][tiles[0].col].move(tiles[0], tiles[1], duration, startSwapTime)
  grid[tiles[1].row][tiles[1].col].move(tiles[1], tiles[0], duration, startSwapTime)

  let now = Date.now()

  // has the duration of animation now passed?
  if (now - startSwapTime >= duration) {

    // Yes! The tile has reached its destination

    // swap the tile data over in the grid
    [grid[tiles[0].row][tiles[0].col], grid[tiles[1].row][tiles[1].col]] = [grid[tiles[1].row][tiles[1].col], grid[tiles[0].row][tiles[0].col] ]

    // store which tiles swapped incase they need to be swapped back
    swappedTiles = Object.assign([], tiles)

    // clear the time that the animation was triggered
    startSwapTime = null;

    // clear the swapping tiles
    swappingTiles.length = 0
  }
}

const swapTilesBack = () => {

  // if tiles have just been swapped, but matches were found, forget that
  // tiles were just swapped
  if (swappedTiles.length && matches.length) {
    swappedTiles.length = 0
  }

  // bail if no tiles have just been swapped
  if (!swappedTiles.length) {
    return
  }

  let tiles = swappedTiles

  // capture the current time because the tiles need to know when the
  // animation was triggered
  if (startSwapTime === null) {
    startSwapTime = Date.now()
  }

  const duration = 200

  grid[tiles[0].row][tiles[0].col].move(tiles[0], tiles[1], duration, startSwapTime)
  grid[tiles[1].row][tiles[1].col].move(tiles[1], tiles[0], duration, startSwapTime)

  let now = Date.now()

  // has the duration of animation now passed?
  if (now - startSwapTime >= duration) {

    // Yes! The tile has reached its destination

    // swap the tile data over in the grid
    [grid[tiles[0].row][tiles[0].col], grid[tiles[1].row][tiles[1].col]] = [grid[tiles[1].row][tiles[1].col], grid[tiles[0].row][tiles[0].col] ]

    // clear the time that the animation was triggered
    startSwapTime = null;

    // clear the swapping tiles
    swappedTiles.length = 0
  }
}

const moveMade = () => {
  // if tiles have just been swapped and matches were found, send an event to
  // state that a valid move was made
  if (swappedTiles.length && matches.length) {
    sendEvent('movemade')
  }
}

/**
 * Determines whether or not a cell in the environment is a buffer cell
 *
 * @param  {Number}  row The row in the environment grid
 * @param  {Number}  col The column in the environment grid
 * @return {Boolean}
 */
const isBufferCell = (row, col) => environment.map[row][col] === -1

/**
 * Is a cell in the environment allowed to have a tile
 *
 * @param  {Number}  row The row in the environment grid
 * @param  {Number}  col The column in the environment grid
 * @return {Boolean}
 */
const cellAllowedTile = (row, col) => environment.map[row][col] === 1

/**
 * Determine whether or not there's a cell at a location in the environment grid
 *
 * @param  {Number}  row The row in the environment grid
 * @param  {Number}  col The column in the environment grid
 * @return {Boolean}
 */
const cellExists = (row, col) =>
  row > -1 && row < grid.length && col > -1 && col < grid[row].length

/**
 * Determine whether or not there's a tile in a cell
 *
 * @param  {Number}  row The row in the environment grid
 * @param  {Number}  col The column in the environment grid
 * @return {Boolean}
 */
const tileInCell = (row, col) =>
  cellExists(row, col) && grid[row][col] !== null

/**
 * Get the value of a tile, if the cell contains a tile
 *
 * @param  {Number}  row The row in the environment grid
 * @param  {Number}  col The column in the environment grid
 * @return {Number}  Return the value of the tile if it exists, or return -1 if the cell is empty
 */
const getCellValue = (row, col) =>
  tileInCell(row, col) ? grid[row][col].value : -1

/**
 * Determine whether or not tiles are currently being swapped
 *
 * @return {Boolean}
 */
const tilesBeingSwapped = () => swappingTiles.length > 0

/**
 * Check if 3 tiles in a row have the same value
 *
 * Compares the 2 cells to the right of a cell
 *
 * @param  {Number}  row Row index
 * @param  {Number}  col Col index
 * @return {Boolean}
 */
const isMatchHorizontal = (row, col) =>
  getCellValue(row, col + 1) > -1 && getCellValue(row, col + 1) === getCellValue(row, col) &&
  getCellValue(row, col + 2) > -1 && getCellValue(row, col + 2) === getCellValue(row, col)

/**
 * Check if 3 tiles in a column have the same value
 *
 * Compares the 2 cells below the cell
 *
 * @param  {Number}  row Row index
 * @param  {Number}  col Column index
 * @return {Boolean}
 */
const isMatchVertical = (row, col) =>
  getCellValue(row + 1, col) > -1 && getCellValue(row + 1, col) === getCellValue(row, col) &&
  getCellValue(row + 2, col) > -1 && getCellValue(row + 2, col) === getCellValue(row, col)

/**
 * Add a tile to the list of matches if it's not already in it
 *
 * @param {Object} cell    Object containing the row and column index of the tile
 * @param {Array} matches  List of tiles already in the list of matches
 * @return {Array} list of matching tiles
 */
const addToMatchList = (cell, matches) => {

  if (!objectIsInArray(cell, matches)) {
    matches.push(cell)
  }

  return matches
}

/**
 * Get matching tiles.
 *
 * Tiles match when 3 or more tiles of the same value
 * are found in a row or column
 *
 * @param  {Boolean} shouldGetMatches Should matches be found? Shouldn't check
 * for matches while tiles are still falling
 * @return {Array} List of cell co-ordinates for matching tiles
 */
const getMatches = (shouldGetMatches) => {

  let matches = []

  // bail if tiles are currently dropping, because we want to wait
  // for all of the tiles to finish moving before checking for matches
  if (!shouldGetMatches) {
    return matches
  }

  parseGrid((row, col, value) => {

    if (cellAllowedTile(row, col) && tileInCell(row, col)) {

      //check horizontal
      if (isMatchHorizontal(row, col)) {
          matches = addToMatchList({ row: row, col: col }, matches)
          matches = addToMatchList({ row: row, col: col + 1 }, matches)
          matches = addToMatchList({ row: row, col: col + 2 }, matches)
      }

      //check vertical
      if (isMatchVertical(row, col)) {
        matches = addToMatchList({ row: row, col: col }, matches)
        matches = addToMatchList({ row: row + 1, col: col }, matches)
        matches = addToMatchList({ row: row + 2, col: col }, matches)
      }
    }
  })

  return matches
}

/**
 * Remove tiles from the grid
 *
 * @param  {Object} list list of tiles that need to be removed
 * @return {void}
 */
const removeTiles = (list, shouldSendEvent = true) => {
  if (list.length) {
    list.forEach((match, index) => {
      if (shouldSendEvent) {

        const finishedRemoving = grid[match.row][match.col].remove()

        if (finishedRemoving) {
          grid[match.row][match.col] = null
        }

        // if every match has been removed, trigger the event to state this
        if (list.every(match => grid[match.row][match.col] === null)) {
          sendEvent("tilesremoved", list.length)
        }

      } else {
        grid[match.row][match.col] = null
      }
    })
  }
}

/**
 * Tell all tiles to update and then return if any of the tiles dropped at all
 *
 * @param  {Boolean} shouldAnimate If shouldAnimate, tiles should be allowed to
 * drop based on forces applied. If not, tiles should snap directly to their destination
 * @return {Boolean}  Did any of the tiles move?
 */
const applyGravity = (shouldAnimate) => {
  if (tilesBeingSwapped()) {
    return
  }

  let tilesDidMove = false

  parseGrid((row, col, value) => {
    if ((isBufferCell(row, col) || cellAllowedTile(row, col)) && tileInCell(row, col)) {

      const tileMoved = grid[row][col].updatePosition(row, col, environment.gravity, shouldAnimate)

      if (!tilesDidMove && tileMoved) {
        tilesDidMove = true
      }
    }
  })

  return tilesDidMove
}

/**
 * Move the tiles down in the grid
 *
 * Doesn't handle animation - this moves the tile data in the grid
 *
 * Recurrs until tiles have all dropped as low as they can go
 *
 * @return {void}
 */
const shiftTiles = () => {

  parseGrid((row, col, value) => {
    //swap the tile in a cell with the cell below, if the cell below doesn't contain a tile
    if (tileInCell(row, col) && cellExists(row + 1, col) && !tileInCell(row + 1, col)) {
      [ grid[row][col], grid[row + 1][col] ] = [ grid[row + 1][col], grid[row][col] ]
    }
  })

  // are any of the empty cells below cells with tile in

  const emptyCellsStillBelowTiles = grid.some((val, row) => {
    return grid[row].some((val, col) => {
      return tileInCell(row, col) && cellExists(row + 1, col) && !tileInCell(row + 1, col)
    })
  })

  if (emptyCellsStillBelowTiles) {
    shiftTiles()
  }
}

/**
 * Backfill empty cells in the buffer with tiles
 *
 * @return {void}
 */
const fillEmptyCells = () => {
  parseGrid((row, col, value) => {
    if (isBufferCell(row, col) && !tileInCell(row, col)) {
      const value = chooseRandomTileValue()
      const x = col * environment.cellSize
      const y = row * environment.cellSize
      const width = environment.cellSize
      const height = environment.cellSize
      grid[row][col] = new Tile(value, x, y, width, height, tileImages[value])
    }
  })
}

/**
 * Create the grid and fill it with tiles
 *
 * @param  {Array} cellMap The environment in which the grid should be created
 * @return {void}
 */
const createGrid = (cellMap) => {

  let i
  let j
  let randValue
  let x
  let y
  const width = environment.cellSize
  const height = environment.cellSize

  const numRows = cellMap.length
  const numCols = cellMap[0].length

  bufferHeight = cellMap.reduce((accumulator, row) => {
    if (row[0] === -1) {
      accumulator += environment.cellSize
    }
    return accumulator
  }, 0)

  for (i = 0; i < numRows; i += 1) {

    // create empty row
    grid[i] = []

    for (j = 0; j < environment.numColumns; j += 1) {
      switch (cellMap[i][j]) {

        case -1:  // buffer cells - tiles should be placed in these cells but are all positioned above the visible area
        case 1:   // playable cells - tiles can be placed in these cells

          // generate a random tile value
          randValue = chooseRandomTileValue()
          x = j * environment.cellSize
          y = (i * environment.cellSize) - bufferHeight

          // create a tile in the cell
          grid[i][j] = new Tile(randValue, x, y, width, height, tileImages[randValue])

          break

        // visible but non-playable cells
        case 0:
          grid[i][j] = null
          break
      }
    }
  }
}

/**
 * Choose a number at random between 0 and the number of tiles used minus 1
 *
 * @return {Number}
 */
const chooseRandomTileValue = () => Math.floor(Math.random() * 6)


/**
 * Determine how many valid moves can be made
 *
 * @return {Number}
 */
const countAvailableMoves = () => {
  let count = 0

  const directions = [
    { row: -1, col: 0 },
    { row: 1, col: 0 },
    { row : 0, col: 1 },
    { row: 0, col: -1 }
  ]

  parseGrid((row, col, value) => {

    directions.forEach(direction => {

      if (tileInCell(row + direction.row, col + direction.col)) {

        // swap the tiles
        [ grid[row][col], grid[row + direction.row][col + direction.col] ] = [ grid[row + direction.row ][col + direction.col], grid[row][col] ]

        // increment the number of available moves if matches are found
        let matches = getMatches(true)
        if (matches.length) {
          count += 1
        }

        // swap the tiles again to return them to their original position
        [ grid[row][col], grid[row + direction.row][col + direction.col] ] = [ grid[row + direction.row ][col + direction.col], grid[row][col] ]
      }
    })
  })

  // each swapping is counted twice, so return half the number found
  return count / 2
}

/**
 * Determine the current state of the grid and render
 *
 * @return {[type]} [description]
 */
const update = () => {
  clearCanvas()
  swapTiles()
  const tilesDidMove = applyGravity(true)
  matches = getMatches(!tilesDidMove)
  moveMade()
  swapTilesBack()
  removeTiles(matches)
  shiftTiles()
  fillEmptyCells()
  return {
    tilesDidMove,
    matches
  }
}

const reset = () => {
  grid.length = 0
  createGrid(environment.map)
  clearNonUserMatches()
}

export {
  init,
  update,
  render,
  reset,
  countAvailableMoves,
}
