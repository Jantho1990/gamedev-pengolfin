import { Bodies, Body } from 'matter-js'
import Rect from '../pop/Rect';
import Vec from '../pop/utils/Vec';

class Course extends Rect {
  constructor(pos) {
    super(1000, 20, { fill: '#eee' })

    this.pivot = new Vec(this.w, this.h).multiply(0.5)
    this.anchor = Vec.from(this.pivot).multiply(-1)

    const body = Bodies.rectangle(0, 0, this.w, this.h, { isStatic: true })
    Body.setPosition(body, pos)
    // Body.rotate(body, Math.PI * 0.04)
    // Step 1: Create the body

    // Step 2: Sync the body and the Rect

    // Sync the rectangle
    this.pos.copy(body.position)
    this.rotation = body.angle

    this.body = body // store the Matter body reference
  }
}

export default Course