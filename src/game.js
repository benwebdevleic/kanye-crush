import * as grid from './grid'
import * as party from './party'
import * as audio from './audio'
import * as kanye from './kanye'
// import { preloadImages } from './image-preloader.js'
import * as environment from './environment'
import * as analytics from './analytics'
import { loadFiles } from './file-loader'

var defaultScore = 0
var defaultMoves = 5

var target = 4000
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

const start = () => {
  console.log('game.start()')
  grid.init(main)

  //send an event to set the default score, moves and target data
  party.sendEvent('scoredidchange', score)
  party.sendEvent('movesdidchange', moves)
  party.sendEvent('targetdidchange', target)
}

var lastLoopTimestamp = new Date()

/**
 * Calculate how much time has passed since the last time this function was
 * called and update the FPS count
 *
 * @return {void}
 */
const updateFPS = () => {
  var thisLoopTimeStamp = new Date()
  environment.setFps(1000 / (thisLoopTimeStamp - lastLoopTimestamp))
  lastLoopTimestamp = thisLoopTimeStamp
}

const main = () => {
  requestAnimationFrame(main)

  updateFPS()

  const updatedGrid = grid.update()
  grid.render()
  playing(updatedGrid)
  win(updatedGrid)
  lose(updatedGrid)
}

const handleMoveMade = event => {
  moves -= 1
  party.sendEvent('movesdidchange', moves)
}

const handleTilesRemoved = numTilesRemoved => {
  const pointsPerTile = 60
  const pointsToBeAdded = numTilesRemoved * pointsPerTile
  score += pointsToBeAdded
  party.sendEvent('scoredidchange', score)
}

const resetScore = () => {
  score = defaultScore
  party.sendEvent('scoredidchange', score)
}

const playing = updateData => {

  const gameInPlay = updateData.tilesDidMove || updateData.matches.length

  if (!gameInPlay && score < target && moves > 0) {
    state = "playing"
  }
}

const win = updateData => {

  const gameInPlay = updateData.tilesDidMove || updateData.matches.length

  if (state !== "win" && !gameInPlay && moves === 0 && score >= target) {
    state = "win"
    party.sendEvent('gamewin')
  }
}

const lose = updateData => {

  const gameInPlay = updateData.tilesDidMove || updateData.matches.length

  if (state !== "lose" && !gameInPlay && moves === 0 && score < target) {
    state = "lose"
    party.sendEvent('gamelose')
  }
}

const preload = () => {
  console.log('game.preload()')

  const audioFiles = [
    {
      name: 'yo',
      file: './audio/yo.mp3',
      volume: 1,
      loop: false
    },
    {
      name: 'doing good',
      file: './audio/doing-good.mp3',
      volume: 1,
      loop: false
    },
    {
      name: 'that was good',
      file: './audio/that-was-good.mp3',
      volume: 1,
      loop: false
    },
    {
      name: 'legend',
      file: './audio/legend.mp3',
      volume: 1,
      loop: false
    },
    {
      name: 'likeamachine',
      file: './audio/likeamachine.mp3',
      volume: 1,
      loop: false
    },
    {
      name: 'celebration-background',
      file: './audio/celebration-background.mp3',
      volume: 0.4,
      loop: true
    },
    {
      name: 'pop',
      file: './audio/pop.ogg',
      volume: 1,
      loop: false
    }
  ]

  //load audio files
  const imageFiles = [
    {
      name: 'coin-gold',
      file: './img/coin-gold.png'
    },
    {
      name: 'coin-silver',
      file: './img/coin-silver.png'
    },
    {
      name: 'coin-bronze',
      file: './img/coin-bronze.png'
    },
    {
      name: 'coin-pink',
      file: './img/coin-pink.png'
    },
    {
      name: 'coin-green',
      file: './img/coin-green.png'
    },
    {
      name: 'coin-red',
      file: './img/coin-red.png'
    },
    {
      name: 'sprite-smoke',
      file: './img/sprite-smoke-cropped.png'
    },
    {
      name: 'sprite-score',
      file: './img/score-sprite.png'
    }
  ]

  loadFiles(audioFiles, 'audio').then(() => {
    loadFiles(imageFiles, 'image').then(() => {
      party.sendEvent('assetsloaded')
    })
  })
}

const reset = () => {
  score = defaultScore
  moves = defaultMoves
  party.sendEvent('scoredidchange', score)
  party.sendEvent('movesdidchange', moves)

  audio.stop('celebration-background')
  grid.reset()
  party.sendEvent('gamereset')
}

const init = () => {
  console.log('game.init()')

  // bind events from the gui
  party.bindEvent('movemade', handleMoveMade)
  party.bindEvent('resetscore', resetScore)
  party.bindEvent('gameshouldstart', start)
  party.bindEvent('tilesremoved', handleTilesRemoved)
  party.bindEvent('gameshouldreset', reset)
  party.bindEvent('gamewin', () => {
    audio.play('celebration-background')
  })

  // preload images
  preload()

  // get kanye ready
  kanye.init()

  // init the GA analytics
  analytics.init()
}

export {
  start,
  score,
  init,
}
