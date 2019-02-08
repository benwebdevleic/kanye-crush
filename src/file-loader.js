import { images } from './images'
import { audioFiles } from './audio'

const fileLists = {
  'image' : images,
  'audio' : audioFiles,
}

const loadImages = file => {
  return new Promise((resolve, reject) => {
    images[file.name] = new Image()
    images[file.name].onload = resolve
    images[file.name].onerror = error => console.log("error", error)
    images[file.name].src = file.file
  })
}

const loadAudio = file => {
  return new Promise(function(resolve, reject) {
    audioFiles[file.name] = {
      el: new Audio(),
      playing: false
    }

    // bind "load" event
    audioFiles[file.name].el.addEventListener('canplaythrough', resolve)

    // create a source element as a child of the audio element and set the src
    // value to be the audio file which will trigger the browser to begin
    // downloading the file
    const src = document.createElement('source')
    src.type = 'audio/mpeg'
    src.src = file.file
    audioFiles[file.name].el.appendChild(src)

    // set audio volume
    if (file.hasOwnProperty('volume')) {
      audioFiles[file.name].el.volume = file.volume
    }

    // handle audio looping
    audioFiles[file.name].el.loop = file.loop
    audioFiles[file.name].el.addEventListener('ended', function() {
      if (this.loop) {
        this.play()
      } else {
        audioFiles[file.name].playing = false
      }
    })
  })
}

const fileHandlers = {
  'image' : loadImages,
  'audio' : loadAudio,
}

const loadFiles = (fileList, type) => {

  return new Promise(function(resolve, reject) {

    let promises = fileList.map(fileHandlers[type])

    Promise.all(promises).then(function() {
      resolve(fileLists[type])
    })
  })
}

export {
  loadFiles,
}
