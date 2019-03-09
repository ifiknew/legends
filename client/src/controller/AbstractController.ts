import { getSocketClient } from "../utils/socket";

abstract class AbstractController {
  protected socket: WebSocket
  
  constructor() {
    this.socket = getSocketClient()
    this.socket.onmessage = (e) => {
      this.onSocketMessage(JSON.parse(e.data))
    }
  }

  protected sendToSocket = (message: App.Message) => {
    this.socket.send(JSON.stringify(message))
  }
  protected abstract onSocketMessage: (message: App.Message) => void
}

export default AbstractController