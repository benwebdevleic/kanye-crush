import * as audio from './audio'
import * as party from './party'

const opinionPhrases = ['yo', 'doing good', 'that was good']

const congratulationPhrases = ['legend', 'likeamachine']

const loadPhraseAudio = phrase => {
  audio.load(phrase.name, phrase.file)
}

const offerOpinion = () => {
  let choice = Math.floor(Math.random() * opinionPhrases.length)

  while (opinionPhrases[choice].playing === true) {
    choice = Math.floor(Math.random() * opinionPhrases.length)
  }

  party.sendEvent('kanyespeakingstart')

  // attempt to play the audio file
  audio.play(opinionPhrases[choice]).then(() => {
    party.sendEvent('kanyespeakingstop')
  })
}

const congratulate = () => {

  // stop offering opinions
  opinionPhrases.forEach(phrase => audio.stop(phrase))

  const choice = Math.floor(Math.random() * congratulationPhrases.length)

  party.sendEvent('kanyespeakingstart')

  audio.play(congratulationPhrases[choice]).then(() => {
    party.sendEvent('kanyespeakingstop')
  })
}

const shutUp = () => {
  opinionPhrases.forEach(phrase => {
      audio.stop(phrase)
  })
  congratulationPhrases.forEach(phrase => {
      audio.stop(phrase)
  })
  party.sendEvent('kanyespeakingstop')
}

const init = () => {
  console.log('kanye.init()')
  party.bindEvent('tilesremoved', offerOpinion)
  party.bindEvent('gamewin', congratulate)
  party.bindEvent('gameshouldreset', shutUp)
}

export {
  offerOpinion,
  congratulate,
  shutUp,
  init,
}
