import * as grid from './grid'
import { bindEvent } from './party'

var score = 0
var moves = 36

const ui = {
  score: document.getElementById('score-value'),
  moves: document.getElementById('moves-value'),
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

const main = () => {
  requestAnimationFrame(main)
  grid.update()
  grid.render()
}

const init = () => {
  bindEvent('tilesremoved', handleTilesRemoved)
  bindEvent('movemade', handleMoveMade)
  ui.score.innerHTML = score
  ui.moves.innerHTML = moves
  grid.init(main)
}

init()
