import * as grid from './grid'
import * as party from './party'
import * as audio from './audio'
import * as kanye from './kanye'

var defaultScore = 0
var defaultMoves = 6

var target = 1000
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

const main = () => {
  requestAnimationFrame(main)
  const didUpdate = grid.update()
  grid.render()
  updateGameState(didUpdate)
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

const updateGameState = (updateData) => {

  const gameInPlay = updateData.tilesDidMove || updateData.matches.length

  if (gameInPlay) {
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
      audio.play('celebration-background')
      party.sendEvent('gamewin')
    }
  }

  // lose
  else if (moves === 0 && score < target) {
    if (state !== "lose") {
      state = "lose"
      party.sendEvent('gamelose')
    }
  }
}

const win = () => {

}

const lose = () => {

}

const preload = () => {

  const files = [
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
    }
  ]

  let promises = files.map(function(asset, index) {
    audio.load(asset.name, asset.file, asset.volume, asset.loop)
  })

  Promise.all(promises).then(() => {
    party.sendEvent('assetsloaded')
  })

  //load audio files

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

  // preload images
  preload()

  // get kanye ready
  kanye.init()
}

export {
  start,
  score,
  init,
}
