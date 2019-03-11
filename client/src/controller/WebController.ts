import AbstractController from "./AbstractController";
import GameEngine from "../engine/GameEngine";
import GameStore from "../store/GameStore";

class WebController extends AbstractController {
  private engine: GameEngine
  

  constructor(socket: WebSocket, store: GameStore, engine: GameEngine) {
    super(socket, store)
    this.engine = engine
  }
  
  protected onSocketMessage = (message: App.Message<any>) => {
    this.engine.execute(message)
  }
}
export default WebController