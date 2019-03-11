import AbstractExecutor from "../AbstractExecutor";
import * as Matter from 'matter-js'
const { Engine, Render, World, Bodies, MouseConstraint, Body, Vector } =  Matter

class ControlMovementExecutor extends AbstractExecutor<'control/move'> {
  

  public execute = async (message: App.Message<'control/move'>) => {
    if (message.source === 'mobile') {
      const { userMap } = this.engine.getContext()
      const body = userMap[message.uuid]
      if (body) {
        const { x, y, r = 1 } = message.data
        console.log(message.data)
        Body.setAngle(body, 0)
        Body.setAngularVelocity(body, 0)
        Body.setVelocity(body, Vector.create(x * r * 2, y * r * 2))
      }
    }
  }
}

export default ControlMovementExecutor