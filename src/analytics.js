import * as party from './party'

const sendEvent = action => {
  if (gtag) {
    gtag('event', action, {
      'event_category': 'kanyecrush',
    })
  }
}

const gameStart = () => {
  console.log('game start event should fire')
  sendEvent('gamestart')
}

const gameWin = () => {
  sendEvent('gamewin')
}

const gameLose = () => {
  sendEvent('gamelose')
}

const init = () => {
  party.bindEvent('gamewin', gameWin)
  party.bindEvent('gamelose', gameLose)
  party.bindEvent('gameshouldstart', gameStart)
}

export {
  init
}
