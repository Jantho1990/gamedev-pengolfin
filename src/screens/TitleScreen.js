import Sound from '../../pop/sound/Sound'
import Text from '../../pop/Text'
import math from '../../pop/utils/math'
import Container from '../../pop/Container'
import SoundPool from '../../pop/sound/SoundPool'

const sounds = {
  plop: new Sound('res/sounds/plop.mp3', { volume: 0.4 }),
  theme: new Sound('res/sounds/theme.mp3', { volume: 0.6, loop: true })
}

const plops = new SoundPool('res/sounds/plop.mp3', { volume: 0.4 }, 3)

class TitleScreen extends Container {
  constructor(game, controls, onStart) {
    super()
    this.onStart = onStart
    this.keys = controls.keys

    const title = this.add(new Text('Pengolfin\'', {
      font: '60pt Freckle Face, cursive',
      align: 'center',
      fill: 'hsl(0, 0%, 100%)'
    }))
    title.pos.set(game.w / 2, game.h / 2 - 40)

    sounds.theme.play()
    this.rate = 0.2
    this.next = this.rate
  }

  update(dt, t) {
    const { keys } = this
    if (math.randOneIn(40)) {
      sounds.plop.play()
    }
    if (t > this.next) {
      this.next = t + this.rate
      // plops.play()
    }
    if (keys.action) {
      sounds.theme.stop()
      this.onStart()
    }
  }
}

export default TitleScreen