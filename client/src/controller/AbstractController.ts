import GameStore from "../store/GameStore";

abstract class AbstractController {
  protected socket: WebSocket
  protected store: GameStore
  
  constructor(socket: WebSocket, store: GameStore) {
    this.socket = socket
    this.socket.onmessage = (e) => {
      this.onSocketMessage(JSON.parse(e.data))
    }
    this.store = store
  }

  protected sendToSocket = (message: App.Message<any>) => {
    this.socket.send(JSON.stringify(message))
  }
  protected abstract onSocketMessage: (message: App.Message<any>) => void
}

export default AbstractController