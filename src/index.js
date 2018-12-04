const canvas = document.getElementById('grid')
const ctx = canvas.getContext('2d')

import { gravity, map, hasGravity } from './environment'
import { Tile } from './tile'
import { preloadImages } from './image-preloader'

var numRows
var numColumns
var cellSize

window.grid = []

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

const chooseRandomTileValue = () => Math.floor(Math.random() * 4)

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

const sendEvent = (name, value = null) =>
  document.dispatchEvent(new CustomEvent(name, { detail: value }))

const bindEvent = (name, cb) =>
  document.addEventListener(name, cb)

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
      }
    }
}

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

const handleMouseUp = function(event) {
  dragging = false
}

const init = () => {

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
    './img/kitten.jpeg',
    './img/cage.jpg',
    './img/murray.jpg',
    './img/seagal.jpg',
  ]

  preloadImages(imageURLs, (loadedImages) => {
    tileImages = loadedImages
    createGrid(map)
    main()
  })
}

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

const render = (matches) => {

  ctx.clearRect(0, 0, canvas.width, canvas.height)

  parseGrid((row, col, value) => {

    if (tileInCell(row, col)) {
      grid[row][col].render(ctx)
    }
  })
}

/**
 * Swap two adjacent tiles in the grid
 *
 * @return Object Array containing tiles that have been swapped when they have finished swapping. The array is empty at all other times
 */
const swapTiles = () => {
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

const isBufferCell = (row, col) => {
  return map[row][col] === -1
}

const cellAllowedTile = (row, col) => {
  return map[row][col] === 1
}

const cellExists = (row, col) => {
  return row < grid.length && col < grid[row].length
}

const tileInCell = (row, col) => {
  return cellExists(row, col) && grid[row][col] !== null
}

const getCellValue = (row, col) => {
  return tileInCell(row, col) ? grid[row][col].value : -1
}

const tilesBeingSwapped = () => {
  return swappingTiles.length > 0
}

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

const removeTiles = list => {
  list.forEach(match => {
    grid[match.row][match.col] = null
  })
}

const updateTiles = () => {
  if (tilesBeingSwapped()) {
    return
  }

  let tilesDidMove = false

  parseGrid((row, col, value) => {
    if ((map[row][col] === -1 || cellAllowedTile(row, col)) && tileInCell(row, col)) {

      const tileMoved = grid[row][col].update(row, col, cellSize, gravity)

      if (!tilesDidMove && tileMoved) {
        tilesDidMove = true
      }
    }
  })

  return tilesDidMove
}

const dropTiles = () => {

  parseGrid((row, col, value) => {
    //swap the tile in a cell with the cell below, if the cell below doesn't contain a tile
    // if (cellExists(row + 1, col) && grid[row + 1][col] === null) {
    if (tileInCell(row, col) && cellExists(row + 1, col) && !tileInCell(row + 1, col)) {
      [ grid[row][col], grid[row + 1][col] ] = [ grid[row + 1][col], grid[row][col] ]
    }
  })

  // are any of the empty cells below cells with tile in

  const emptyCellsStillBelowTiles = grid.some((val, row) => {
    return grid[row].some((val, col) => {
      // return cellExists(row + 1, col) && grid[row + 1][col] === null && grid[row][col] !== null
      return tileInCell(row, col) && cellExists(row + 1, col) && !tileInCell(row + 1, col)
    })
  })

  if (emptyCellsStillBelowTiles) {
    dropTiles()
  }
}

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

const main = () => {
  swapTiles()
  const tilesDidMove = updateTiles()
  const matches = getMatches(!tilesDidMove)
  removeTiles(matches)
  dropTiles()
  fillEmptyCells()
  render(matches)
  requestAnimationFrame(main)
}

init()
