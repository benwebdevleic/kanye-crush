let files = {}

const play = name => {
  if (files[name].playing) {
    return false
  }

  const playPromise = files[name].el.play()

  if (playPromise !== null) {
    playPromise.catch(err => {
      console.log('problem playing audio', err)
    })
  }

  files[name].playing = true

  return true
}

const load = (name, file, volume, loop = false) => {
  files[name] = {
    el: new Audio(),
    playing: false
  }
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
