import { ctx, fps } from './environment'

/**
 * Display an animated sprite
 *
 * opts:
 * w: width of the output
 * h: height of the output
 * x: x co-ordinate on the canvas
 * y: y co-ordinate on the canvas
 * numRows: number of rows in the sprite image
 * numCols: number of columns in the sprite image
 */
class Sprite {

  constructor(img, opts) {
    this.img = img
    this.w = opts.w
    this.h = opts.h
    this.x = opts.x
    this.y = opts.y
    this.numCols = opts.numCols
    this.numRows = opts.numRows
    this.row = 0
    this.col = 0
    this.targetFrameRate = 30
    this.tickCount = 0
    this.frameIndex = 0
    this.ticksPerFrame = Math.floor(fps / this.targetFrameRate)
    this.numberOfFrames = this.numCols * this.numRows
  }

  /**
   * Works out which frame of the animation should be displayed
   *
   * @return {void}
   */
  update() {

    this.ticksPerFrame = Math.floor(fps / this.targetFrameRate)

    if (this.tickCount > this.ticksPerFrame) {
      this.tickCount = 0
      this.frameIndex += 1

      this.row = Math.floor(this.frameIndex / this.numCols)
      this.col = this.frameIndex - this.row * this.numCols
    }

    this.tickCount += 1

    return this.frameIndex === this.numberOfFrames - 1
  }

  /**
   * Render the output in the canvas
   *
   * @return {void}
   */
  render() {
    const sX = this.w * this.col
    const sY = this.h * this.row
    const sWidth = this.w
    const sHeight = this.h
    const dX = this.x
    const dY = this.y
    const dWidth = this.w
    const dHeight = this.h

    // draw the image
    ctx.drawImage(this.img, sX, sY, sWidth, sHeight, dX, dY, dWidth, dHeight)
  }
}

export {
  Sprite
}
