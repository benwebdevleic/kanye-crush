import { gravity, map, hasGravity } from './environment'
import { Tile } from './tile'
import { preloadImages } from './image-preloader'
import { sendEvent } from './party'

const canvas = document.getElementById('grid')
const ctx = canvas.getContext('2d')

var numRows
var numColumns
var cellSize

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

      const mouseX = event.offsetX
      const mouseY = event.offsetY

      const cellRow = Math.floor((mouseY + bufferHeight) / cellSize)
      const cellCol = Math.floor(mouseX / cellSize)

      // if the mouse moves to a different tile
      if (draggingTile.row !== cellRow || draggingTile.col !== cellCol) {

        dragging = false

        // swap the tiles
        swappingTiles.push({ row: draggingTile.row, col: draggingTile.col })
        swappingTiles.push({ row: cellRow, col: cellCol })

        sendEvent('movemade')
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

  // work out which cell the user has clicked on
  const mouseX = event.offsetX
  const mouseY = event.offsetY

  dragStartX = mouseX
  dragStartY = mouseY

  draggingTile.row = Math.floor((dragStartY + bufferHeight) / cellSize)
  draggingTile.col = Math.floor(dragStartX / cellSize)
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
 * Render the grid
 *
 * @return {void}
 */
const render = () => {

  parseGrid((row, col, value) => {

    if (tileInCell(row, col)) {
      grid[row][col].render(ctx)
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
    removeTiles(matches)
    dropTiles()
    fillEmptyCells()
    updateTiles(false)
    matches = getMatches(true)
  }
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

  let i;
  let j;

  numRows = 9
  numColumns = 9

  cellSize = canvas.width / numColumns

  bufferRowCount = numRows

  canvas.addEventListener("mousedown", handleMouseDown)
  canvas.addEventListener("mousemove", handleMouseMove)
  canvas.addEventListener("mouseup", handleMouseUp)

  const imageURLs = [
    './img/coin-gold.png',
    './img/coin-silver.png',
    './img/coin-bronze.png',
    './img/coin-pink.png',
    './img/coin-green.png',
    './img/coin-red.png',
  ]

  preloadImages(imageURLs, (loadedImages) => {
    tileImages = loadedImages

    // create a grid of tiles
    createGrid(map)

    // clear matches accidentally created
    clearNonUserMatches()

    cb()
  })
}

/**
 * Clear the canvas element
 *
 * @return {void}
 */
const clearCanvas = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
}

/**
 * Swap two adjacent tiles in the grid
 *
 * @return Object Array containing tiles that have been swapped when they have finished swapping. The array is empty at all other times
 */
const swapTiles = () => {

  // bail if tiles aren't currently being swapped
  if (!swappingTiles.length) {
    return swappedTiles;
  }

  // capture the current time because the tiles need to know when the
  // animation was triggered
  if (startSwapTime === null) {
    startSwapTime = Date.now()
  }

  const duration = 200

  grid[swappingTiles[0].row][swappingTiles[0].col].move(swappingTiles[0], swappingTiles[1], duration, startSwapTime)
  grid[swappingTiles[1].row][swappingTiles[1].col].move(swappingTiles[1], swappingTiles[0], duration, startSwapTime)

  let now = Date.now()

  // has the duration of animation now passed?
  if (now - startSwapTime >= duration) {

    // Yes! The tile has reached its destination

    // swap the tile data over in the grid
    [grid[swappingTiles[0].row][swappingTiles[0].col], grid[swappingTiles[1].row][swappingTiles[1].col]] = [grid[swappingTiles[1].row][swappingTiles[1].col], grid[swappingTiles[0].row][swappingTiles[0].col] ]
    swappedTiles = Object.assign([], swappingTiles)

    // clear the time that the animation was triggered
    startSwapTime = null;

    // clear the swapping tiles
    swappingTiles.length = 0
  }
}

/**
 * Determines whether or not a cell in the environment is a buffer cell
 *
 * @param  {Number}  row The row in the environment grid
 * @param  {Number}  col The column in the environment grid
 * @return {Boolean}
 */
const isBufferCell = (row, col) => {
  return map[row][col] === -1
}

/**
 * Is a cell in the environment allowed to have a tile
 *
 * @param  {Number}  row The row in the environment grid
 * @param  {Number}  col The column in the environment grid
 * @return {Boolean}
 */
const cellAllowedTile = (row, col) => {
  return map[row][col] === 1
}

/**
 * Determine whether or not there's a cell at a location in the environment grid
 *
 * @param  {Number}  row The row in the environment grid
 * @param  {Number}  col The column in the environment grid
 * @return {Boolean}
 */
const cellExists = (row, col) => {
  return row > -1 && row < grid.length && col > -1 && col < grid[row].length
}

/**
 * Determine whether or not there's a tile in a cell
 *
 * @param  {Number}  row The row in the environment grid
 * @param  {Number}  col The column in the environment grid
 * @return {Boolean}
 */
const tileInCell = (row, col) => {
  return cellExists(row, col) && grid[row][col] !== null
}

/**
 * Get the value of a tile, if the cell contains a tile
 *
 * @param  {Number}  row The row in the environment grid
 * @param  {Number}  col The column in the environment grid
 * @return {Number}  Return the value of the tile if it exists, or return -1 if the cell is empty
 */
const getCellValue = (row, col) => {
  return tileInCell(row, col) ? grid[row][col].value : -1
}

/**
 * Determine whether or not tiles are currently being swapped
 *
 * @return {Boolean}
 */
const tilesBeingSwapped = () => {
  return swappingTiles.length > 0
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

    if (map[row][col] === 1 && grid[row][col] !== null) {

      //check horizontal
      if ((getCellValue(row, col + 1) > -1 && getCellValue(row, col + 1) === getCellValue(row, col)) &&
          (getCellValue(row, col + 2) > -1 && getCellValue(row, col + 2) === getCellValue(row, col))) {
            matches.push({ row: row, col: col })
            matches.push({ row: row, col: col + 1 })
            matches.push({ row: row, col: col + 2 })
      }

      //check vertical
      if ((getCellValue(row + 1, col) > -1 && getCellValue(row + 1, col) === getCellValue(row, col)) &&
          (getCellValue(row + 2, col) > -1 && getCellValue(row + 2, col) === getCellValue(row, col))) {
            matches.push({ row: row, col: col })
            matches.push({ row: row + 1, col: col })
            matches.push({ row: row + 2, col: col })
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
const removeTiles = list => {
  if (list.length) {
    list.forEach(match => {
      grid[match.row][match.col] = null
    })
    sendEvent("tilesremoved", list.length)
  }
}

/**
 * Tell all tiles to update and then return if any of the tiles dropped at all
 *
 * @param  {Boolean} shouldAnimate If shouldAnimate, tiles should be allowed to
 * drop based on forces applied. If not, tiles should snap directly to their destination
 * @return {Boolean}  Did any of the tiles move?
 */
const updateTiles = (shouldAnimate) => {
  if (tilesBeingSwapped()) {
    return
  }

  let tilesDidMove = false

  parseGrid((row, col, value) => {
    if ((map[row][col] === -1 || cellAllowedTile(row, col)) && tileInCell(row, col)) {

      const tileMoved = grid[row][col].updatePosition(row, col, gravity, shouldAnimate)

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
const dropTiles = () => {

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
    dropTiles()
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
      const x = col * cellSize
      const y = row * cellSize
      const width = cellSize
      const height = cellSize
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
  const width = cellSize
  const height = cellSize

  const numRows = cellMap.length
  const numCols = cellMap[0].length

  bufferHeight = cellMap.reduce((accumulator, row) => {
    if (row[0] === -1) {
      accumulator += cellSize
    }
    return accumulator
  }, 0)

  for (i = 0; i < numRows; i += 1) {

    // create empty row
    grid[i] = []

    for (j = 0; j < numColumns; j += 1) {
      switch (cellMap[i][j]) {

        case -1:  // buffer cells - tiles should be placed in these cells but are all positioned above the visible area
        case 1:   // playable cells - tiles can be placed in these cells

          // generate a random tile value
          randValue = chooseRandomTileValue()
          x = j * cellSize
          y = (i * cellSize) - bufferHeight

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
  const tilesDidMove = updateTiles(true)
  const matches = getMatches(!tilesDidMove)
  removeTiles(matches)
  dropTiles()
  fillEmptyCells()
}

const reset = () => {
  grid.length = 0
  createGrid(map)
  clearNonUserMatches()
}

export {
  init,
  update,
  render,
  reset,
  countAvailableMoves,
}
