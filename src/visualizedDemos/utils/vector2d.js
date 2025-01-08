export class Vector2d extends Array {
  constructor(x = 1, y = 0) {
    // 默认是单位向量，而不是(0,0)，这样子的话scale就没有效果
    super(x, y)
  }
  set x(v) {
    this[0] = v
  }
  set y(v) {
    this[1] = v
  }
  get x() {
    return this[0]
  }
  get y() {
    return this[1]
  }

  get length() {
    return Math.hypot(this[0], this[1])
  }
  get dir() {
    return Math.atan2(this[1], this[0])
  }

  copy() {
    return new Vector2d(this[0], this[1])
  }
  add(v) {
    this.x += v.x
    this.y += v.y
    return this
  }
  rotate(dir) {
    const [x, y] = this
    this[0] = x * Math.cos(dir) - y * Math.sin(dir)
    this[1] = x * Math.sin(dir) + y * Math.cos(dir)
    return this
  }
  scale(ratio) {
    this[0] *= ratio
    this[1] *= ratio
    return this
  }
}
