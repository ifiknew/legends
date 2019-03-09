import GameEngine from "../GameEngine";

interface IExecutor {
  execute: (command: App.Message) => Promise<any>
}

abstract class AbstractExecutor implements IExecutor {

  private engine: GameEngine

  constructor(engine: GameEngine) {
    this.engine = engine
  }

  abstract execute: any
}

export default AbstractExecutor