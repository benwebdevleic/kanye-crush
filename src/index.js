import * as grid from './grid'
import { bindEvent, sendEvent } from './party'
import * as kanye from './kanye'
import * as audio from './audio'

var defaultScore = 0
var defaultMoves = 6

var target = 1000
var score = defaultScore
var moves = defaultMoves

var backgroundMusic

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
  intro: document.getElementById('game-intro')
}

const handleTilesRemoved = event => {
  kanye.offerOpinion()
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

  backgroundMusic.pause()
  backgroundMusic.currentTime = 0
  kanye.congratulate()
  audio.play('celebration-background')

  ui.modalContent.appendChild(ui.gameWin)
  ui.modal.classList.add("show")
}

const hideWin = () => {
  ui.modal.classList.remove("show")
  ui.stateContainer.appendChild(ui.gameWin)
  kanye.shutUp()
  audio.stop('celebration-background')
  backgroundMusic.play()
}

const showIntro = () => {
  ui.modalContent.appendChild(ui.intro)
  ui.modal.classList.add("show")
}

const hideIntro = () => {
  ui.modal.classList.remove("show")
  ui.stateContainer.appendChild(ui.intro)
}

const updateGameState = (shouldUpdate) => {

  if (!shouldUpdate) {
    return
  }

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
  const tilesMoved = grid.update()
  grid.render()
  updateGameState(!tilesMoved)
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

  const startBtn = document.getElementById('start')
  backgroundMusic = new Audio('./audio/tension-bed.mp3')
  backgroundMusic.loop = true
  backgroundMusic.addEventListener('canplaythrough', function() {
    startBtn.classList.add('show')
  })
  startBtn.addEventListener('click', function() {
    hideIntro()
    grid.init(main)
    backgroundMusic.play()
  })

  audio.load('celebration-background', './audio/celebration-background.mp3', 0.4, true)

  showIntro()
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
