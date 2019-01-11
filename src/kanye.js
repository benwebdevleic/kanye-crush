import * as audio from './audio'
import * as party from './party'

const opinionPhrases = ['yo', 'doing good', 'that was good']

const congratulationPhrases = ['legend', 'likeamachine']

const loadPhraseAudio = phrase => {
  audio.load(phrase.name, phrase.file)
}

const offerOpinion = () => {
  const choice = Math.floor(Math.random() * opinionPhrases.length)

  // attempt to play the audio file
  const played = audio.play(opinionPhrases[choice])

  // if the audio file was already being played, try again
  if (!played) {
    // offerOpinion()
  }
}

const congratulate = () => {

  // stop offering opinions
  opinionPhrases.forEach(phrase => audio.stop(phrase))

  const choice = Math.floor(Math.random() * congratulationPhrases.length)
  audio.play(congratulationPhrases[choice])
}

const shutUp = () => {
  opinionPhrases.forEach(phrase => {
      audio.stop(phrase)
  })
  congratulationPhrases.forEach(phrase => {
      audio.stop(phrase)
  })
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
