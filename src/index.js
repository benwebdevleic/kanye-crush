import * as grid from './grid'
import { bindEvent } from './party'

var defaultScore = 0
var defaultMoves = 5

var score = defaultScore
var moves = defaultMoves

var isGameOver = () => {
  return moves === 0
}

const ui = {
  score: document.getElementById('score-value'),
  moves: document.getElementById('moves-value'),
  gameOver: document.getElementById('game-over'),
  btnReset: document.getElementById('btn-reset'),
}

const handleTilesRemoved = event => {
  const numTilesRemoved = event.detail
  const pointsToBeAdded = numTilesRemoved * 60
  score += pointsToBeAdded
  ui.score.innerHTML = score
}

const handleMoveMade = event => {
  moves -= 1
  ui.moves.innerHTML = moves
}

const handleBtnReset = event => {
  reset()
}

const gameOver = () => {
  if (moves > 0) {
    return
  }

  ui.gameOver.style.display = 'block'
}

const main = () => {
  requestAnimationFrame(main)
  grid.update()
  grid.render()
  gameOver()
}

const init = () => {
  bindEvent('tilesremoved', handleTilesRemoved)
  bindEvent('movemade', handleMoveMade)
  ui.score.innerHTML = score
  ui.moves.innerHTML = moves
  ui.btnReset.addEventListener('click', handleBtnReset)
  grid.init(main)
}

const reset = () => {
  grid.reset()
  score = defaultScore
  moves = defaultMoves
  ui.score.innerHTML = score
  ui.moves.innerHTML = moves
  ui.gameOver.style.display = 'none'
}

init()
