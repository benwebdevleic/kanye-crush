import * as party from './party'

const score = document.querySelectorAll('.score-value')
const moves = document.getElementById('moves-value')
const target = document.getElementById('target-value')
const gameLose = document.getElementById('game-lose')
const gameWin = document.getElementById('game-win')
const btnRetry = document.querySelectorAll('.btn-retry')
const modal = document.getElementById('modal')
const modalContent = document.getElementById('modal-content')
const stateContainer = document.getElementById('game-state-containers')
const intro = document.getElementById('game-intro')
const startBtn = document.getElementById('start')

var backgroundMusic

const showIntro = () => {
  modalContent.appendChild(intro)
  modal.classList.add("show")
}

const hideIntro = () => {
  modal.classList.remove("show")
  stateContainer.appendChild(intro)
}

const showWin = () => {
  backgroundMusic.pause()
  backgroundMusic.currentTime = 0

  modalContent.appendChild(gameWin)
  modal.classList.add("show")
}

const hideWin = () => {
  modal.classList.remove("show")
  stateContainer.appendChild(gameWin)
  backgroundMusic.play()
}

const showLose = () => {
  if (state !== "lose") {
    return
  }

  modalContent.appendChild(gameLose)
  modal.classList.add("show")
}

const hideLose = () => {
  modal.classList.remove("show")
  stateContainer.appendChild(gameLose)
}

const renderMoves = val => {
  moves.innerHTML = val
}

const renderScore = val => {
  score.forEach(el => {
    el.innerHTML = val
  })
  // score.innerHTML = val
}

const renderTarget = val => {
  target.innerHTML = val
}

const resetGameUI = () => {
  hideWin()
  hideLose()
}

const init = () => {
  console.log('gui.init()')
  party.bindEvent('gamewin', showWin)
  party.bindEvent('gamelose', showLose)
  party.bindEvent('movesdidchange', renderMoves)
  party.bindEvent('scoredidchange', renderScore)
  party.bindEvent('targetdidchange', renderTarget)
  party.bindEvent('gamereset', resetGameUI)

  showIntro()

  backgroundMusic = new Audio('./audio/tension-bed.mp3')
  backgroundMusic.loop = true
  backgroundMusic.addEventListener('canplaythrough', function() {
    startBtn.classList.add('show')
  })

  // bind the start button
  startBtn.addEventListener('click', function() {
    backgroundMusic.play()
    hideIntro()
    party.sendEvent('gameshouldstart')
  })

  btnRetry.forEach(el => {
    el.addEventListener('click', function() {
      resetGameUI()
      party.sendEvent('gameshouldreset')
    })
  })
}

export {
  score,
  moves,
  target,
  gameLose,
  gameWin,
  btnRetry,
  modal,
  modalContent,
  stateContainer,
  intro,
  startBtn,
  showWin,
  hideWin,
  showLose,
  hideLose,
  showIntro,
  hideIntro,
  bind,
  init,
}
