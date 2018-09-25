import { Bodies, Body } from 'matter-js'
import TileSprite from "../../pop/TileSprite";
import Texture from "../../pop/Texture";
import Vec from "../../pop/utils/Vec";

const texture = new Texture('res/img/pengolfuin.png')

class Penguin extends TileSprite {
  constructor(pos) {
    super(texture, 32, 32)
    this.pivot.x = this.w / 2
    this.pivot.y = this.h / 2
    this.anchor = Vec.from(this.pivot).multiply(-1)

    this.body = Bodies.circle(pos.x, pos.y, 10, {
      restitution: 0.7
    })
    this.body.torque = 0.002
  }

  fire(angle, power) {
    const { body } = this
    Body.applyForce(
      body,
      { x: body.position.x, y: body.position.y - 10 },
      { x: Math.cos(angle) * power, y: Math.sin(angle) * power }
    )
  }

  update() {
    // Sync the physics body
    const { pos, body } = this
    this.rotation = body.angle
    pos.copy(body.position)
  }
}

export default Penguin