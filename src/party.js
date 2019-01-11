const sendEvent = (name, value = null) =>
  document.dispatchEvent(new CustomEvent(name, { detail: value }))

const bindEvent = (name, cb) =>
  document.addEventListener(name, event => cb(event.detail))

export {
  sendEvent,
  bindEvent,
}
