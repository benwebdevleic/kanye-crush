import * as party from './party'

const score = document.querySelectorAll('.score-value')
const moves = document.getElementById('moves-value')
const target = document.querySelectorAll('.target-value')
const gameLose = document.getElementById('game-lose')
const gameWin = document.getElementById('game-win')
const btnRetry = document.querySelectorAll('.btn-retry')
const modal = document.getElementById('modal')
const modalContent = document.getElementById('modal-content')
const stateContainer = document.getElementById('game-state-containers')
const intro = document.getElementById('game-intro')
const startBtn = document.getElementById('start')
const kanye = document.querySelector('.kanye-face-full')
const fullScreenPage = document.querySelector('.fullscreen-page')
const fullScreenContent = document.querySelector('.fullscreen-content')
const playerInfo = document.getElementById('player-info')
const canvasContainer = document.querySelector('.canvas-container')
const onboarding = document.getElementById('game-onboarding')
const btnConfirmOnboarding = document.getElementById('confirm-onboarding')
const gameLoading = document.getElementById('game-loading')

var backgroundMusic

const showLoading = () => {
  fullScreenContent.appendChild(gameLoading)
  fullScreenPage.classList.add('show')
}

const hideLoading = () => {
  fullScreenPage.classList.remove('show')
  stateContainer.appendChild(gameLoading)
}

const showIntro = () => {
  fullScreenContent.appendChild(intro)
  fullScreenPage.classList.add("show")
}

const hideIntro = () => {
  fullScreenPage.classList.remove("show")
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
  backgroundMusic.pause()
  backgroundMusic.currentTime = 0

  modalContent.appendChild(gameLose)
  modal.classList.add("show")
}

const hideLose = () => {
  modal.classList.remove("show")
  stateContainer.appendChild(gameLose)
  backgroundMusic.play()
}

const renderMoves = val => moves.innerHTML = val

const renderScore = val =>
  score.forEach(el => el.innerHTML = val)

const renderTarget = val =>
  target.forEach(el => el.innerHTML = val)

const resetGameUI = () => {
  hideWin()
  hideLose()
}

const showGameGUI = () => {
  playerInfo.classList.add('show')
  canvasContainer.classList.add('show')
}

const kanyeSpeak = () => {

  //shut kanye up before starting to speak
  kanyeStopSpeaking()

  kanye.classList.add('speak')
}

const kanyeStopSpeaking = () => {
  kanye.classList.remove('speak')
}

const showOnboarding = () => {
  modalContent.appendChild(onboarding)
  modal.classList.add('show')
}

const handleOnBoardingConfirm = () => {
  modal.classList.remove('show')
  stateContainer.appendChild(onboarding)
  backgroundMusic.play()
}

const handleGameStart = () => {
  showGameGUI()
  showOnboarding()
}

const handleAssetsLoaded = () => {
  hideLoading()
  showIntro()
}

const init = () => {
  console.log('gui.init()')
  party.bindEvent('gamewin', showWin)
  party.bindEvent('gamelose', showLose)
  party.bindEvent('movesdidchange', renderMoves)
  party.bindEvent('scoredidchange', renderScore)
  party.bindEvent('targetdidchange', renderTarget)
  party.bindEvent('gamereset', resetGameUI)
  party.bindEvent('kanyespeakingstart', kanyeSpeak)
  party.bindEvent('kanyespeakingstop', kanyeStopSpeaking)
  party.bindEvent('gameshouldstart', handleGameStart)
  party.bindEvent('assetsloaded', handleAssetsLoaded)

  showLoading()

  backgroundMusic = new Audio('./audio/tension-bed.mp3')
  backgroundMusic.loop = true
  backgroundMusic.addEventListener('canplaythrough', function() {
    startBtn.classList.add('show')
  })

  // bind the start button
  startBtn.addEventListener('click', function() {
    hideIntro()
    party.sendEvent('gameshouldstart')
  })

  btnRetry.forEach(el => {
    el.addEventListener('click', function() {
      resetGameUI()
      party.sendEvent('gameshouldreset')
    })
  })

  btnConfirmOnboarding.addEventListener('click', handleOnBoardingConfirm)
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
