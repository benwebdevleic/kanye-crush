const preloadImages = (imageURLs, cb) => {
  let images = []

  let promises = imageURLs.map(function(val, index) {
    return new Promise(function(resolve, reject) {
      images[index] = new Image()
      images[index].onload = resolve
      images[index].onerror = function(error) {
        console.log("error", error)
      }
      images[index].src = val
    })
  })

  Promise.all(promises).then(function() {
    cb(images)
  })
}

export {
  preloadImages
}
