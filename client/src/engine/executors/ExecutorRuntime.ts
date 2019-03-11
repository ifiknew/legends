import GameEngine from "../GameEngine";
import ControlMovementExecutor from "./control/ControlMovementExecutor";
import AppInitExecutor from "./lifecycle/AppInitExecutor";
import GameOnExecutor from "./lifecycle/GameOnExecutor";
import CreateMonsterExecutor from "./battle/monster/CreateMonsterExecutor";
import AttackExecutor from "./battle/attack/AttackExecutor";

const bindExecutorMap = (engine: GameEngine) => ({
  'app/init': new AppInitExecutor(engine),
  'game/on': new GameOnExecutor(engine),

  'control/move': new ControlMovementExecutor(engine),

  'battle/monster/create': new CreateMonsterExecutor(engine),

  'battle/attack': new AttackExecutor(engine),
})

const ExecutorRuntime = {
  bind: (engine: GameEngine) => {
    const executorMap = bindExecutorMap(engine)
    engine.setExecutorMap(executorMap)
  }
}

export default ExecutorRuntime
