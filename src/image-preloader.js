import { images } from './images'

const preloadImages = (imageList, cb) => {

  let promises = imageList.map(function(img, index) {
    return new Promise(function(resolve, reject) {
      images[img.name] = new Image()
      images[img.name].onload = resolve
      images[img.name].onerror = function(error) {
        console.log("error", error)
      }
      images[img.name].src = img.file
    })
  })

  Promise.all(promises).then(function() {
    cb(images)
  })
}

export {
  preloadImages
}
