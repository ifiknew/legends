
declare namespace App {

  interface Message {
    source: 'mobile' | 'web' | 'server',
    uuid: string
    type: string
    data: {
      [key: string]: any
    }
  }

  interface SocketInfo {
    source: 'mobile' | 'web' | 'server',
    uuid: string
  }

}