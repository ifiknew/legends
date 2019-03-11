import AbstractExecutor from "../AbstractExecutor";
import * as Matter from 'matter-js'
import GameState from "../../../enums/GameState";
import delay from "../../../utils/delay";
const { Engine, Render, World, Bodies, MouseConstraint, Body, Vector } =  Matter

class GameOnExecutor extends AbstractExecutor<'game/on'> {
  

  public execute = async (message: App.Message<'game/on'>) => {
    this.engine.setGameState(GameState.On)
    this.loopMonster()
  }

  private loopMonster = async () => {
    while (this.engine.getContext().gameState === GameState.On) {
      await delay(1000)
      this.engine.execute({
        type: 'battle/monster/create',
        data: {}
      })
      this.engine.execute({
        type: 'battle/attack',
        data: {
          group: 'legend'
        }
      })
    }
  }
}

export default GameOnExecutor