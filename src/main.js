import pop from '../pop'
const { Game, entity, math, Text, KeyControls, MouseControls } = pop
import GameScreen from './screens/GameScreen'
import TitleScreen from './screens/TitleScreen'

const game = new Game(800, 400)
const controls = {
  keys: new KeyControls(),
  mouse: new MouseControls(game.renderer.view)
}

math.useSeededRandom(true)
let lastSeed = 1 // (Math.random() * 420000) | 0
math.randomSeed(lastSeed)

let hole = 0
let total = 0

function playHole(completed = true, shots = 0) {
  if (completed) {
    hole++
    total += shots
    shots = 0
  } else {
    // Reset seed to last level
    math.randomSeed(lastSeed)
  }

  lastSeed = math.randomSeed()
  const stats = {
    hole,
    shots,
    total
  }
  game.scene = new GameScreen(game, controls, playHole, stats)
}
game.scene = new TitleScreen(game, controls, playHole)
game.run()