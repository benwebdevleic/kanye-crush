const easeInQuad = (t, b, c, d) => c*(t/=d)*t + b

const objectIsInArray = (obj, arr) => {
  return arr.some(i => JSON.stringify(i) === JSON.stringify(obj))
}

export {
  easeInQuad,
  objectIsInArray,
}
