import React, { Component } from 'react'
import 'typeface-roboto'
import './App.css'
import styles from './App.module.scss'
import guid from '../../utils/guid';
import { getSocketClient } from '../../utils/socket';
import BattleContainer from './battle/BattleContainer';
import LegendContainer from './legend/LegendContainer';
import MonsterContainer from './monster/MonsterContainer';

const uuid = guid()
const socket = getSocketClient()
class App extends Component {
  state = {
    battleContainer: null as HTMLDivElement | null
  }
  componentDidMount() {
    const msg: App.Message = {
      type: 'app/init',
      source: 'web',
      uuid,
      data: {}
    }
    socket.onopen = () => {
      socket.send(JSON.stringify(msg))
    }
    
  }
  render() {
    return (
      <div className={styles.App}>
        <div className={styles.main}>
          <div className={styles.battleField}>
            <div 
              ref={el => {
                if (el && this.state.battleContainer != el) {
                  this.setState({ battleContainer: el })
                }
              }}
            />
            {this.state.battleContainer && (
              <BattleContainer container={this.state.battleContainer}/>
            )}
          </div>
          <div className={styles.side}>
            <LegendContainer />
          </div>
        </div>
        <div className={styles.monsterGroup}>
          <MonsterContainer />
        </div>
      </div>
    )
  }
}

export default App;
