import AbstractExecutor from "../AbstractExecutor";
import * as Matter from 'matter-js'
const { Engine, Render, World, Bodies, MouseConstraint, Body, Vector } =  Matter

class AppInitExecutor extends AbstractExecutor<'app/init'> {
  
  public execute = async (message: App.Message<'app/init'>) => {
    if (message.source === 'mobile') {
      const { userMap, world } = this.engine.getContext()
      const { uuid = '' } = message
      if (!userMap[uuid]) {
        const body = Bodies.circle(450, 200, 30, {
          frictionAir: 0,
          render: {
            sprite: {
              texture: '/img/wizard-face.png',
              xScale: 60 / 64,
              yScale: 60 / 64,
            }
          },
          collisionFilter: {
            group: -1,
            category: 1,
            mask: 1
          }
        })
        World.addBody(world, body)
        userMap[uuid] = body

        this.engine.execute({
          type: 'game/on',
          data: {}
        })
      }
    }
  }
}

export default AppInitExecutor