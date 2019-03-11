
declare namespace App {

  interface Message<T extends string> {
    source: 'mobile' | 'web' | 'server',
    uuid: string,
    type: T,
    data: MessageMap[T]
  }

  interface MessageMap {
    'control/move': { x: number, y: number, r?: number }
    'app/init': {}
  }

  type Keys = keyof MessageMap
  
  interface ExecutorMap {
    [k: string] : { execute: (message: Message<any>) => Promise<any> }
  }

  interface SocketInfo {
    source: 'mobile' | 'web' | 'server',
    uuid: string
  }

  interface StoreState {
  }
  
}