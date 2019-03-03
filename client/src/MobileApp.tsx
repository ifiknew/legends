import * as React from 'react';
import getSocketClient from './utils/socket';
import guid from './utils/guid';

export interface MobileAppProps {
}

const uuid = guid()
const socket = getSocketClient()


export default class MobileApp extends React.Component<MobileAppProps, any> {
  componentDidMount() {
    setInterval(()=> {
      console.log('send')
      const msg: App.Message = {
        type: 'app/init',
        source: 'mobile',
        uuid,
        data: {}
      }
      socket.send(JSON.stringify(msg))
    }, 1000)
  }
  public render() {
    return (
      <div>
        welcome mobile
      </div>
    );
  }
}
