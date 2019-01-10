import * as audio from './audio'

const opinionPhrases = [
  {
    name: 'yo',
    file: './audio/yo.mp3',
  },
  {
    name: 'doing good',
    file: './audio/doing-good.mp3'
  },
  {
    name: 'that was good',
    file: './audio/that-was-good.mp3'
  }
]

const congratulationPhrases = [
  {
    name: 'legend',
    file: './audio/legend.mp3',
  },
  {
    name: 'likeamachine',
    file: './audio/likeamachine.mp3',
  }
]

const loadPhraseAudio = phrase => {
  audio.load(phrase.name, phrase.file)
}

const offerOpinion = () => {
  const choice = Math.floor(Math.random() * opinionPhrases.length)

  // attempt to play the audio file
  const played = audio.play(opinionPhrases[choice].name)

  // if the audio file was already being played, try again
  if (!played) {
    // offerOpinion()
  }
}

const congratulate = () => {

  // stop offering opinions
  opinionPhrases.forEach(phrase => audio.stop(phrase.name))

  const choice = Math.floor(Math.random() * congratulationPhrases.length)
  audio.play(congratulationPhrases[choice].name)
}

const shutUp = () => {
  opinionPhrases.forEach(phrase => {
      audio.stop(phrase.name)
  })
  congratulationPhrases.forEach(phrase => {
      audio.stop(phrase.name)
  })
}

opinionPhrases.forEach(loadPhraseAudio)
congratulationPhrases.forEach(loadPhraseAudio)

export {
  offerOpinion,
  congratulate,
  shutUp,
}
