import * as Matter from 'matter-js'
import AbstractExecutor from './executors/AbstractExecutor';
const { Engine, Render, World, Bodies, MouseConstraint, Body, Vector } =  Matter

const DEFAULT_SIZE = 64
const LONG_AXIS = 3000
const MINOR_AXIS = 50
const WIDTH = window.innerWidth - 320
const HEIGHT = window.innerHeight - 170

class GameEngine {

  private executors: Array<AbstractExecutor> = []

  public init = (container: HTMLDivElement) => {
    const engine = Engine.create({
    })
    const world = engine.world
    world.gravity.y = 0
    const renderer = Render.create({
      element: container,
      engine,
      options: {
        wireframes: false,
        width: WIDTH,
        height: HEIGHT,
        background: '#fff'
      } as any,
    })

    const boxA = Bodies.circle(300, 200, 10, {
      render: {
        sprite: {
          texture: '/img/flame.png',
          xScale: 20 / DEFAULT_SIZE,
          yScale: 20 / DEFAULT_SIZE,
        },
      
      }
    })
    const boxB = Bodies.rectangle(450, 50, 80, 80)
    const boxC = Bodies.circle(450, 50, 10)
    const ground = Bodies.rectangle(0, 0, LONG_AXIS, MINOR_AXIS, { isStatic: true })
    const ground2 = Bodies.rectangle(0, HEIGHT, LONG_AXIS, MINOR_AXIS, { isStatic: true })
    const ground3 = Bodies.rectangle(WIDTH, 0, MINOR_AXIS, LONG_AXIS, { isStatic: true })
    const ground4 = Bodies.rectangle(0, 0, MINOR_AXIS, LONG_AXIS, { isStatic: true })
    World.add(world, [boxA, boxB, boxC, ground, ground2, ground3, ground4, MouseConstraint.create(engine) as any])

    
    const run = () => {
      Body.translate(boxB, Vector.create(1,1))
      requestAnimationFrame(run);
    }
    run()
    Engine.run(engine)
    Render.run(renderer)
  }

  public setExecutors = (executors: Array<AbstractExecutor>) => {
    this.executors = executors
  }
  public execute = (command: App.Message) => {
    this.executors.forEach(ex => ex.execute(command))
  }
}

export default GameEngine