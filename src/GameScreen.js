import { Engine, Events, World, Render } from 'matter-js'
import Penguin from './entities/Penguin'
import Container from '../pop/Container';
import math from '../pop/utils/math'
import Course from './Course';

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

    // Add everyone to the game
    this.penguin = this.add(penguin)
    this.course = this.add(course)

    // Set up physics
    this.engine = Engine.create({
      enableSleeping: true
    })
    World.add(this.engine.world, [penguin.body, course.body])
    Events.on(penguin.body, 'sleepStart', () => {
      this.ready = true
    })
    
    Engine.run(this.engine)

    this.render = Render.create({
      element: document.querySelector('#board'),
      engine: this.engine,
      options: {
        width: this.w,
        height: this.h,
        showAngleIndicator: true
      }
    })
    Render.run(this.render)
  }

  update(dt, t) {
    super.update(dt, t)
    const { penguin, h, mouse, render } = this

    // Off the edge?
    if (penguin.pos.y > h) {
      Render.stop(render)
      
      // Hack to remove the old render canvas
      document.querySelector('#board').removeChild(
        document.querySelectorAll('#board canvas')[1]
      )
      
      this.onHole(false, this.shows)
    }

    if (mouse.released) {
      const angle = -Math.PI / math.rand(1.75, 2.25)
      const power = 0.01
      penguin.fire(angle, power)
    }

    mouse.update()
  }
}

export default GameScreen