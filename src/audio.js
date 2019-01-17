let files = {}

const play = (name, p) => {
  if (files[name].playing) {
    return false
  }

  const pr = new Promise((resolve, reject) => {
    const playPromise = files[name].el.play()

    if (playPromise !== null) {
      playPromise.catch(err => {
        console.log('problem playing audio', err)
      })

      files[name].playing = true
    }

    files[name].el.addEventListener('ended', () => {
      console.log('audio playing ended', p)
      resolve()
    })
  })

  return pr
}

const load = (name, file, volume, loop = false) => {
  return new Promise(function(resolve, reject) {
    files[name] = {
      el: new Audio(),
      playing: false
    }
    files[name].el.addEventListener('load', resolve)
    const src = document.createElement('source')
    src.type = 'audio/mpeg'
    src.src = file
    files[name].el.appendChild(src)

    if (volume) {
      files[name].el.volume = volume
    }

    files[name].el.loop = loop

    files[name].el.addEventListener('ended', function() {
      if (this.loop) {
        this.play()
      } else {
        files[name].playing = false
      }
    })
  })
}

const stop = name => {
  files[name].el.pause()
  files[name].el.currentTime = 0
  files[name].playing = false
}

export {
  load,
  play,
  stop,
}
