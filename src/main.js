import pop from '../pop'
const { Game, entity, math, Text } = pop
import KeyControls from '../pop/controls/KeyControls';
import MouseControls from '../pop/controls/MouseControls';
import GameScreen from './GameScreen'

const game = new Game(800, 400)
const controls = {
  keys: new KeyControls(),
  mouse: new MouseControls(game.renderer.view)
}
function playHole() {
  game.scene = new GameScreen(game, controls, playHole)
}
playHole()
game.run()