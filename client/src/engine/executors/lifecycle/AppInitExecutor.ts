import AbstractExecutor from "../AbstractExecutor";
import * as Matter from 'matter-js'
const { Engine, Render, World, Bodies, MouseConstraint, Body, Vector } =  Matter

class AppInitExecutor extends AbstractExecutor<'app/init'> {
  
  public execute = async (message: App.Message<'app/init'>) => {
    if (message.source === 'mobile') {
      const { userMap, world } = this.engine.getContext()
      if (!userMap[message.uuid]) {
        const body = Bodies.circle(450, 200, 20, {
          frictionAir: 0,
          render: {
            sprite: {
              texture: '/img/wizard-face.png',
              xScale: 40 / 64,
              yScale: 40 / 64,
            }
          }
        })
        World.addBody(world, body)
        userMap[message.uuid] = body
      }
    }
  }
}

export default AppInitExecutor