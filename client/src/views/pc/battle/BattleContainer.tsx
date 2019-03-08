import * as React from 'react';
import * as Matter from 'matter-js'
const { Engine, Render, World, Bodies } =  Matter
const DEFAULT_SIZE = 64
export interface BattleContainerProps {
  container: HTMLDivElement
}

const UNKNOWN: unknown = null
export default class BattleContainer extends React.Component<BattleContainerProps, any> {
  width = window.innerWidth - 320
  height = window.innerHeight - 170
  componentDidMount = () => {
    const { container } = this.props
    const engine = Engine.create()
    const renderer = Render.create({
      element: container,
      engine,
      options: {
        wireframes: false,
        width: this.width,
        height: this.height,
        background: '#fff'
      } as any,
      
    })
    const boxA = Bodies.circle(300, 200, 20, {
      render: {
        sprite: {
          texture: '/img/flame.png',
          xScale: 40 / DEFAULT_SIZE,
          yScale: 40 / DEFAULT_SIZE,
        },
      }
    })
    const boxB = Bodies.rectangle(450, 50, 80, 80)
    const ground = Bodies.rectangle(-1, -1, 3000, 10, { isStatic: true })
    const ground2 = Bodies.rectangle(-1, 1 + this.height, 3000, 10, { isStatic: true })
    const ground3 = Bodies.rectangle(1 + this.width, -1, 10, 3000, { isStatic: true })
    const ground4 = Bodies.rectangle(-1, -1, 10, 3000, { isStatic: true })
    World.add(engine.world, [boxA, boxB, ground, ground2, ground3, ground4])
    Engine.run(engine)
    Render.run(renderer)
    
  }

  public render() {
    return null
  }
}
