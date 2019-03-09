import GameEngine from "../GameEngine";
import AbstractExecutor from "./AbstractExecutor";

const ExecutorRuntime = {
  bind: (engine: GameEngine, excutors: Array<AbstractExecutor>) => {
    engine.setExecutors(excutors)
  }
}

export default ExecutorRuntime