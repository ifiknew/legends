import React, { Component } from 'react'
import 'typeface-roboto'
import './App.css'
import styles from './App.module.scss'
import guid from '../../utils/guid';
import { getSocketClient } from '../../utils/socket';
import LegendContainer from './legend/LegendContainer';
import MonsterContainer from './monster/MonsterContainer';
import GameEngine from '../../engine/GameEngine';
import WebController from '../../controller/WebController';
import GameStore from '../../store/GameStore';

const uuid = guid()
const socket = getSocketClient()

const engine = new GameEngine()
const store = new GameStore()
const controller = new WebController(socket, store, engine)

class App extends Component {

  state = {
    battleContainer: null as HTMLDivElement | null
  }

  componentDidMount() {
    const msg: App.Message<'app/init'> = {
      type: 'app/init',
      source: 'web',
      uuid,
      data: {}
    }
    socket.send(JSON.stringify(msg))
  }

  /**
   * init engine when get the container
   */
  getRef = (el: HTMLDivElement) => {
    if (el && this.state.battleContainer != el) {
      this.setState({ battleContainer: el })
      engine.init(el)
    }
  }

  render() {
    return (
      <div className={styles.App}>
        <div className={styles.main}>
          <div className={styles.battleField}>
            <div ref={this.getRef} />
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
