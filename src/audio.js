let audioFiles = {}

const play = (name, p) => {
  if (audioFiles[name].playing) {
    return new Promise((resolve, reject) => {
      resolve()
    })
  }

  const pr = new Promise((resolve, reject) => {
    const playPromise = audioFiles[name].el.play()

    if (playPromise !== null) {
      playPromise.catch(err => {
        console.log('problem playing audio', err)
      })

      audioFiles[name].playing = true
    }

    audioFiles[name].el.addEventListener('ended', () => {
      resolve()
    })
  })

  return pr
}

const stop = name => {
  audioFiles[name].el.pause()
  audioFiles[name].el.currentTime = 0
  audioFiles[name].playing = false
}

export {
  load,
  play,
  stop,
  audioFiles,
}
