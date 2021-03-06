import { easeInQuad } from './utils'
import { Sprite } from './sprite'
import { images } from './images'
import { canvas, ctx, numRows, numColumns } from './environment'
import * as audio from './audio'

class Tile {
  constructor(value, x, y, w, h, img) {
    this.x = x
    this.y = y
    this.w = w
    this.h = h
    this.value = value
    this.img = img
    this.vy = 0
    this.terminalvy = 10

    this.removeAnimationSpriteImage = images['sprite-smoke']
    this.removeAnimationSprite

    this.scoreAnimationSpriteImage = images['sprite-score']
  }

  /**
   * Change the x,y position of the tile if it needs to fall
   *
   * @param  {Number} row           The row in the grid the tile is in
   * @param  {Number} col           The column in the grid the tile is in
   * @param  {Number} gravity       Force of gravity applied to the tile
   * @param  {Boolean} shouldAnimate Should the tile snap straight to it's final position or should gravity take over
   * @return {Boolean}               Whether or not the tile moved from its original position
   */
  updatePosition(row, col, gravity, shouldAnimate) {

    const currentY = this.y
    const targetVerticalPosition = (row * this.h) - (numRows * this.h)

    if (shouldAnimate) {
      this.vy += gravity
      this.y += Math.min(this.vy, this.terminalvy)

      // is the tile colliding with the bottom of the grid?
      if (this.y > canvas.height - (500 / numRows)) {
        this.y = canvas.height - (500 / numRows)
        this.vy = 0
      }

      // is the tile below where it should fall to?
      if (this.y > targetVerticalPosition) {
        this.y = targetVerticalPosition
        // this.vy = -this.vy / bounceDampening
        this.vy = 0
      }

    } else {
        this.y = targetVerticalPosition
    }

    // return whether or not the tile has moved
    return this.y !== currentY
  }

  /**
   * Draw the tile image
   *
   * @param  {Object} ctx The canvas on which to draw the tile image
   * @return {void}
   */
  render() {
    if (this.removeAnimationSprite === undefined) {
      ctx.drawImage(this.img, this.x, this.y, this.w, this.h)
    }
  }

  /**
   * Get the position along a linear scale something has moved based on how much
   * time has passed since the animation began
   *
   * @param  {Number} start         Starting value
   * @param  {Number} end           Ending value
   * @param  {Number} duration      How many ms should it take to complete the animation
   * @param  {Number} startSwapTime The timestamp at the beginning of the animation
   * @return {Number}               The new position along the linear scale
   */
  getUpdatedAnimationPosition(start, end, duration, startSwapTime) {

    let now = Date.now()

    return easeInQuad(now - startSwapTime, start, end - start, duration)
  }

  /**
   * Move the tile
   *
   * Changes the x and y values based on the direction of movement
   * and the amount of time that's passed since the animation started
   *
   * @param  {Object} tileFrom      Object containing row and col values for the tile
   * @param  {Object} tileTo        Object containing row and col values for where the tile should be moved to
   * @param  {Number} duration      How long in ms the tile should take to move
   * @param  {Number} startSwapTime The time the animation was triggered
   * @return {void}
   */
  move(tileFrom, tileTo, duration, startSwapTime) {

    const bufferHeight = this.h * numRows

    let tileXStart = tileFrom.col * this.w
    let tileXEnd = tileTo.col * this.w

    let tileYStart = tileFrom.row * this.h - bufferHeight
    let tileYEnd = tileTo.row * this.h - bufferHeight

    let tilex = this.getUpdatedAnimationPosition(tileXStart, tileXEnd, duration, startSwapTime)
    let tiley = this.getUpdatedAnimationPosition(tileYStart, tileYEnd, duration, startSwapTime)

    if (tileXEnd > tileXStart) {
      this.x = Math.min(tilex, tileXEnd)
    } else {
      this.x = Math.max(tilex, tileXEnd)
    }

    if (tileYEnd > tileYStart) {
      this.y = Math.min(tiley, tileYEnd)
    } else {
      this.y = Math.max(tiley, tileYEnd)
    }
  }

  remove() {

    audio.play('pop')

    // create an instance of the smoke sprite animation
    if (this.removeAnimationSprite === undefined) {
      this.removeAnimationSprite = new Sprite(this.removeAnimationSpriteImage, {
        w: 128,
        h: 128,
        x: this.x + (this.w / 2) - (128 / 2),
        y: this.y + (this.h / 2) - (128 / 2),
        numRows: 2,
        numCols: 8
      })
    }

    const lastFrame = this.removeAnimationSprite.update()
    this.removeAnimationSprite.render()

    if (this.scoreAnimationSprite === undefined) {
      this.scoreAnimationSprite = new Sprite(this.scoreAnimationSpriteImage, {
        w: 128,
        h: 128,
        x: this.x + (this.w / 2) - (128 / 2),
        y: this.y + (this.h / 2) - (128 / 2),
        numRows: 1,
        numCols: 8,
      })
    }

    this.scoreAnimationSprite.update()
    this.scoreAnimationSprite.render()

    return lastFrame
  }
}

export {
  Tile
}
