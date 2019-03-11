import AbstractExecutor from "../../AbstractExecutor";
import * as Matter from 'matter-js'
const { Engine, Render, World, Bodies, MouseConstraint, Body, Vector } =  Matter

class CreateMonsterExecutor extends AbstractExecutor<'battle/monster/create'> {
  
  lastTime = new Date().valueOf()
  public execute = async (message: App.Message<'battle/monster/create'>) => {
    const current = new Date().valueOf()
    if (current - this.lastTime > 3000) {
      this.lastTime = current
      const body = Bodies.circle(450, 200, 20, {
        frictionAir: 0,
        render: {
          sprite: {
            texture: '/img/monster/goblin-green.png',
            xScale: 40 / 64,
            yScale: 40 / 64,
          }
        }
      })
      this.engine.monsterList.push({
        body
      })
      World.addBody(this.engine.getWorld(), body)
    }
  }
}

export default CreateMonsterExecutor