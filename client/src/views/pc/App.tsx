import React, { Component } from 'react'
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { red, deepOrange } from '@material-ui/core/colors';
import 'typeface-roboto'
import './App.css'
import styles from './App.module.scss'
import { BrowserRouter } from 'react-router-dom';
import guid from '../../utils/guid';
import getSocketClient from '../../utils/socket';
import BattleContainer from './battle/BattleContainer';
import LegendContainer from './legend/LegendContainer';
import MonsterContainer from './monster/MonsterContainer';
(window as any).decomp = require('poly-decomp')

const theme = createMuiTheme({
  spacing: { unit: 4 },
  palette: {
    primary: deepOrange,
    secondary: red
  }
})

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
        <MuiThemeProvider theme={theme}>
          <BrowserRouter>
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
          </BrowserRouter>
        </MuiThemeProvider>
    )
  }
}

export default App;
