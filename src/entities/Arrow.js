import Rect from "../../pop/Rect";
import Vec from "../../pop/utils/Vec";
import math from "../../pop/utils/math";
import Container from "../../pop/Container";

class Arrow extends Container {
  constructor(max = 100) {
    super()
    this.pos = new Vec();
    this.max = max;
    this.maxDragDistance = 80;

    this.background = this.add(
      new Rect(max, 4, { fill: 'hsla(0, 0%, 0%, 0.1)' })
    )
    this.arrow = this.add(new Rect(0, 4, { fill: 'hsl(10, 60%, 80%)' }))
  }

  start(pos) {
    this.pos.copy(pos)
  }

  drag(drag) {
    const { arrow, pos, max, maxDragDistance } = this

    // Calculate angle and power
    const angle = math.angle(pos, drag)
    const dist = math.distance(pos, drag)
    const power = Math.min(1, dist / maxDragDistance)

    // Set the display
    this.rotation = angle
    arrow.w = power * max

    return { angle, power }
  }
}

export default Arrow