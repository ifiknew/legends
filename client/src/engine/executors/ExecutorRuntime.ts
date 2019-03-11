import GameEngine from "../GameEngine";
import ControlMovementExecutor from "./control/ControlMovementExecutor";
import AppInitExecutor from "./lifecycle/AppInitExecutor";

const bindExecutorMap = (engine: GameEngine) => ({
  'control/move': new ControlMovementExecutor(engine),
  'app/init': new AppInitExecutor(engine)
})

const ExecutorRuntime = {
  bind: (engine: GameEngine) => {
    const executorMap = bindExecutorMap(engine)
    engine.setExecutorMap(executorMap)
  }
}

export default ExecutorRuntime
