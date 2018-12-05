import { easeInQuad } from './utils'

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
    const targetVerticalPosition = (row * this.h) - (9 * this.h)

    if (shouldAnimate) {
      this.vy += gravity
      this.y += Math.min(this.vy, this.terminalvy)

      const bounceDampening = 6

      // is the tile colliding with the bottom of the grid?
      if (this.y > 500 - (500 / 9)) {
        this.y = 500 - (500 / 9)
        // this.vy = -this.vy / bounceDampening
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
  render(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.w, this.h)
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

    const bufferHeight = this.h * 9

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
}

export {
  Tile
}
