import React, { Component } from 'react'
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { red, deepOrange } from '@material-ui/core/colors';
import 'typeface-roboto'
import './App.css'
import { BrowserRouter } from 'react-router-dom';
import guid from './utils/guid';
import getSocketClient from './utils/socket';

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
            <div>hello web</div>
          </BrowserRouter>
        </MuiThemeProvider>
    )
  }
}

export default App;
