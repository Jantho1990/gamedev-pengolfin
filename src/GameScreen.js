import { Engine, Events, World, Render } from 'matter-js'
import Penguin from './entities/Penguin'
import Container from '../pop/Container';
import math from '../pop/utils/math'
import Course from './Course';
import Arrow from './entities/Arrow';

class GameScreen extends Container {
  constructor(game, controls, onHole) {
    super()
    this.w = game.w
    this.h = game.h

    this.ready = false
    this.onHole = onHole
    this.mouse = controls.mouse
    
    const course = new Course({ x: 450, y: 300 })
    const penguin = new Penguin({ x: this.w / 2, y: -32 })
    const arrow = new Arrow()

    // Add everyone to the game
    this.penguin = this.add(penguin)
    this.course = this.add(course)
    this.arrow = this.add(arrow)

    // Set up physics
    this.engine = Engine.create({
      enableSleeping: true
    })
    World.add(this.engine.world, [penguin.body, course.body])
    Events.on(penguin.body, 'sleepStart', () => {
      this.ready = true
      arrow.visible = true
    })
    
    Engine.run(this.engine)
  }

  fireAway(angle, power) {
    const { penguin, arrow } = this

    this.ready = false
    arrow.visible = false
    penguin.fire(angle, power)
  }

  update(dt, t) {
    super.update(dt, t)
    const { penguin, h, mouse, arrow } = this

    // Off the edge?
    if (penguin.pos.y > h) {
      this.onHole(false, this.shows)
    }

    if (mouse.pressed) {
      arrow.start(mouse.pos)
    }

    if (this.ready) {
      if (mouse.isDown || mouse.released) {
        const { angle, power } = arrow.drag(mouse.pos)
        if (mouse.released) {
          this.fireAway(angle, power * 0.021)
        }
      }
    }

    mouse.update()
  }
}

export default GameScreen