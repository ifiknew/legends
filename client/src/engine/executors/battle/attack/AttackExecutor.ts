import AbstractExecutor from "../../AbstractExecutor";
import * as Matter from 'matter-js'
import Database from "../../../../database/Database";
import GEO from "../../../../utils/geo";
const { Engine, Render, World, Bodies, MouseConstraint, Body, Vector } =  Matter

class AttackExecutor extends AbstractExecutor<'battle/attack'> {
  
  public execute = async (message: App.Message<'battle/attack'>) => {
    const skill = Database.Skill[0]
    const { group } = message.data
    if (group === 'legend') {
      const monsterList = this.engine.monsterList
      const current = Object.values(this.engine.userMap)[0]
      if (!current) { return }
      const index = GEO.findNearest(
        current,
        monsterList.map(v => v.body)
      )
      const target = monsterList[index]
      if (!target) { return }
      const angle = Vector.angle(current.position, target.body.position)
      const body = Bodies.circle(current.position.x, current.position.y, 10, {
        frictionAir: 0,
        render: {
          sprite: {
            texture: skill.image,
            xScale: 20 / 64,
            yScale: 20 / 64,
          }
        },
        collisionFilter: {
          group: -1,
          category: 1,
          mask: 1
        }
      })
      // Body.setAngle(body, angle)
      Body.setVelocity(body, Vector.mult(Vector.normalise(Vector.sub(target.body.position, current.position)), 3))
      // debugger
      World.addBody(this.engine.getWorld(), body)
    }
  }


}

export default AttackExecutor