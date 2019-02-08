import * as party from './party'

const sendEvent = action => {
  if (gtag) {
    gtag('event', action, {
      'event_category': 'kanyecrush',
    })
  }
}

const gameStart = () => {
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
  party.bindEvent('gamereset', gameStart)
}

export {
  init
}
