import AbstractController from "./AbstractController";
import GameStore from "../store/GameStore";

class MobileController extends AbstractController {

  constructor(socket: WebSocket, store: GameStore) {
    super(socket, store)
  }
  
  protected onSocketMessage = (message: App.Message<any>) => {
  }
}
export default MobileController