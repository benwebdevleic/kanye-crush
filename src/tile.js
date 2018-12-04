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
    if (this.img === undefined) {
      debugger;
    }
    ctx.drawImage(this.img, this.x, this.y, this.w, this.h)
  }
}

export {
  Tile
}
