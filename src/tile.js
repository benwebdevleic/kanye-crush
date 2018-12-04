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

  update(row, col, cellSize, gravity) {

    const currentY = this.vy

    this.vy += gravity
    this.y += Math.min(this.vy, this.terminalvy)

    const bounceDampening = 6

    // is the tile colliding with the bottom of the grid?
    if (this.y > 500 - (500 / 9)) {
      this.y = 500 - (500 / 9)
      // this.vy = -this.vy / bounceDampening
      this.vy = 0
    }

    // const targetVerticalPosition = (row * cellSize) - ((9 * cellSize))
    const targetVerticalPosition = (row * cellSize) - (9 * cellSize)

    // is the tile below where it should fall to?
    if (this.y > targetVerticalPosition) {
      this.y = targetVerticalPosition
      // this.vy = -this.vy / bounceDampening
      this.vy = 0
    }

    // return whether or not the tile has moved
    return this.vy !== currentY
  }

  render(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.w, this.h)
  }

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
   * @return void
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
