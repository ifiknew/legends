import * as WebSocket from 'ws';

const MAX_USER = 2

class Dispatcher {
  private mobiles:  Array<App.SocketInfo & { socket: WebSocket }> = []
  private web: App.SocketInfo & { socket: WebSocket } = null

  public dispatch = (message: App.Message, socket: WebSocket) => {
    console.log(message)
    if (message.type === 'app/init') {
      const isValid = this.validateAndInitialize(message, socket)
      if (!isValid) { return }
    }
    if (message.type === 'app/disconnect') {
      if (message.source === 'web') {
        this.web = null
      } else {
        this.mobiles = this.mobiles.filter(v => v.uuid != message.uuid)
      }
    }

    this.getTargets(message).forEach(v => {
      Dispatcher.send(v.socket, message)
    })
  }

  private validateAndInitialize = (message: App.Message, socket: WebSocket) => {
    if (message.type !== 'app/init') {
      throw new Error('should never happen')
    }
    if (
      (message.source === 'mobile' && this.mobiles.length === MAX_USER)
      || (message.source === 'web' && this.web)
    ) {
      Dispatcher.send(socket, {
        source: 'server',
        uuid: '',
        type: 'app/error',
        data: {
          message: 'The room is full'
        }
      })
      return false
    }
    if (message.source === 'mobile' && this.mobiles.some(v => v.uuid === message.uuid)) {
      Dispatcher.send(socket, {
        source: 'server',
        uuid: '',
        type: 'app/error',
        data: {
          message: 'You have already been in'
        }
      })
      return false
    }
    if (message.source === 'mobile') {
      this.mobiles = [...this.mobiles, {...message, socket}]
    } else if (message.source === 'web') {
      this.web = {...message, socket}
    }
    Dispatcher.send(socket, {
      source: 'server',
      uuid: '',
      type: 'app/init_succ',
      data: {}
    })
    return true
  }

  private getTargets = (message: App.Message) => {
    const targets = 
      message.source === 'server' ? 
        [...this.mobiles, this.web] 
      : message.source === 'web' ? 
        this.mobiles 
      : 
        [this.web]
    return targets.filter(Boolean)
  }

  private static send = (socket: WebSocket, message: App.Message) => {
    if (!socket) { return }
    socket.send(JSON.stringify(message))
  }
}

export default Dispatcher