import * as React from 'react';
import getSocketClient from '../../utils/socket';
import guid from '../../utils/guid';
import styles from './MobileApp.module.scss'
export interface MobileAppProps {
}

const uuid = guid()
const socket = getSocketClient()

const R = 75
export default class MobileApp extends React.Component<MobileAppProps, any> {
  direction: HTMLDivElement | null = null
  componentDidMount() {
    setTimeout(() => {
      const msg: App.Message = {
        type: 'app/init',
        source: 'mobile',
        uuid,
        data: {}
      }
      socket.send(JSON.stringify(msg))
    }, 2000);

  }
  public render() {
    return (
      <div className={styles.MobileApp}>
        <div 
          className={styles.directionCircle} 
          ref={el => {
            if (this.direction != el && el != null) {
              this.direction = el
            }
          }}
          onTouchMove={e => {
            e.preventDefault()
            e.stopPropagation()
            if (this.direction == null) {
              return
            }
            const centerX = this.direction.offsetLeft + R
            const centerY = this.direction.offsetTop + R

            const touch = e.targetTouches[0]
            const disX = touch.clientX - centerX
            const disY = touch.clientY - centerY
            const normalizedDis = (disX ** 2 + disY ** 2) ** 0.5
            
            const msg: App.Message = {
              type: 'control/move',
              source: 'mobile',
              uuid,
              data: {
                x: disX / normalizedDis,
                y: disY / normalizedDis,
              }
            }
            socket.send(JSON.stringify(msg))
          }}
        />

        <div className={styles.buttonGroup}><div>cs</div></div>
      </div>
    );
  }
}
