import * as Matter from 'matter-js'
import ExecutorRuntime from './executors/ExecutorRuntime';
import GameState from '../enums/GameState';
const { Engine, Render, World, Bodies, MouseConstraint, Body, Vector } =  Matter
const DEFAULT_SIZE = 64
const LONG_AXIS = 3000
const MINOR_AXIS = 50
const WIDTH = window.innerWidth - 320
const HEIGHT = window.innerHeight - 170
class GameEngine {

  private executorMap: App.ExecutorMap = {}

  private engine: Matter.Engine
  private world: Matter.World

  public userMap: { [key: string]: Matter.Body } = {}
  public monsterList: Array<App.Monster> = []
  public flyList: Array<any> = []
  public gameState: GameState = GameState.Ready

  constructor() {
    const engine = Engine.create({})
    const world = engine.world
    this.engine = engine
    this.world = world
    world.gravity.y = 0

    /**
     * bind executors to current engine
     */
    ExecutorRuntime.bind(this)
  }


  /**
   * game engine runs after binding to a container.
   */
  public init = (container: HTMLDivElement) => {
    
    const renderer = Render.create({
      element: container,
      engine: this.engine,
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
    World.add(this.world, [boxA, boxB, boxC, ground, ground2, ground3, ground4, MouseConstraint.create(this.engine) as any])
    Engine.run(this.engine)
    Render.run(renderer)

  }

  /**
   * context is used by executors
   */
  public getContext = () => {
    const { engine, world, userMap, monsterList, flyList, gameState } = this
    return {
      engine,
      world,
      userMap,
      monsterList,
      flyList,
      gameState
    }
  }

  public getWorld = () => {
    return this.world
  }

  public setExecutorMap = (map: App.ExecutorMap) => {
    this.executorMap = map
  }

  public setGameState = (gameState: GameState) => {
    this.gameState = gameState
  }
  /**
   * execute commands.
   * called only by web controller
   */
  public execute = (command: App.Message<string>) => {
    const executor = this.executorMap[command.type]
    if (executor) {
      console.log(command)
      executor.execute(command)
    }
  }
}

export default GameEngine