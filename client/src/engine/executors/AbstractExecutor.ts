import GameEngine from "../GameEngine";


abstract class AbstractExecutor<T extends string> {

  protected engine: GameEngine

  constructor(engine: GameEngine) {
    this.engine = engine
  }

  public abstract execute: (command: App.Message<T>) => Promise<any>
}

export default AbstractExecutor