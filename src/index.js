import * as grid from './grid'
import { bindEvent, sendEvent } from './party'

var defaultScore = 0
var defaultMoves = 6

var target = 560
var score = defaultScore
var moves = defaultMoves

/**
 * The game's current state
 *
 * playing|win|lose
 *
 * @type {String}
 */
var state = "playing"

const ui = {
  score: document.getElementById('score-value'),
  moves: document.getElementById('moves-value'),
  target: document.getElementById('target-value'),
  gameLose: document.getElementById('game-lose'),
  gameWin: document.getElementById('game-win'),
  btnRetry: document.querySelectorAll('.btn-retry'),
  modal: document.getElementById('modal'),
  modalContent: document.getElementById('modal-content'),
  stateContainer: document.getElementById('game-state-containers'),
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

const showLose = () => {
  if (state !== "lose") {
    return
  }

  ui.modalContent.appendChild(ui.gameLose)
  ui.modal.classList.add("show")
}

const hideLose = () => {
  ui.modal.classList.remove("show")
  ui.stateContainer.appendChild(ui.gameLose)
}

const showWin = () => {
  if (state !== "win") {
    return
  }

  ui.modalContent.appendChild(ui.gameWin)
  ui.modal.classList.add("show")
}

const hideWin = () => {
  ui.modal.classList.remove("show")
  ui.stateContainer.appendChild(ui.gameWin)
}

const updateGameState = () => {

  // playing
  if (score < target && moves > 0) {
    state = "playing"
  }

  // win
  else if (moves === 0 && score >= target) {
    if (state !== "win") {
      state = "win"
      sendEvent('gamewin')
    }
  }

  // lose
  else if (moves === 0 && score < target) {
    if (state !== "lose") {
      state = "lose"
      sendEvent('gamelose')
    }
  }
}

const main = () => {
  requestAnimationFrame(main)
  updateGameState()
  grid.update()
  grid.render()
}

const resetScore = () => {
  score = defaultScore
  ui.score.innerHTML = score
}

const init = () => {
  bindEvent('tilesremoved', handleTilesRemoved)
  bindEvent('movemade', handleMoveMade)
  bindEvent('resetscore', resetScore)
  bindEvent('gamewin', showWin)
  bindEvent('gamelose', showLose)
  ui.score.innerHTML = score
  ui.moves.innerHTML = moves
  ui.target.innerHTML = target
  ui.btnRetry.forEach(el => {
    el.addEventListener('click', handleBtnReset)
  })
  grid.init(main)
}

const reset = () => {
  grid.reset()
  hideWin()
  hideLose()
  score = defaultScore
  moves = defaultMoves
  ui.score.innerHTML = score
  ui.moves.innerHTML = moves
}

init()
