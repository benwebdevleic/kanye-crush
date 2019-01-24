const gravity = 0.5

const map = [
  [-1, -1, -1, -1, -1, -1, -1],
  [-1, -1, -1, -1, -1, -1, -1],
  [-1, -1, -1, -1, -1, -1, -1],
  [-1, -1, -1, -1, -1, -1, -1],
  [-1, -1, -1, -1, -1, -1, -1],
  [-1, -1, -1, -1, -1, -1, -1],
  [-1, -1, -1, -1, -1, -1, -1],
  [1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1],
]

const canvas = document.getElementById('grid')
const ctx = canvas.getContext('2d')

let fps

const setFps = val => {
  fps = val
}

const numRows = map.reduce((acc, row) => acc + (row.some(v => v === 1) ? 1 : 0), 0)
const numColumns = map[0].length
let cellSize = 0

const setCellSize = val => cellSize = val

export {
  gravity,
  map,
  canvas,
  ctx,
  fps,
  setFps,
  numRows,
  numColumns,
  cellSize,
  setCellSize,
}
