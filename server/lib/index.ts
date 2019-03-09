import * as WebSocket from 'ws'
import Dispatcher from './Dispatcher';

var PORT = 8086;
const HOST = '192.168.1.102'
const server = new WebSocket.Server({
  port: PORT,
  host: HOST,
  path: ''
})



const dispatcher = new Dispatcher()

server.on('connection', function(socket){
  console.log('connect to a new client');
  let initMessage = null
  socket.on('message',function(data){
    const message: App.Message = JSON.parse('' + data)
    initMessage = message
    dispatcher.dispatch(message, socket)
  });

  socket.on('error',function(exception){
    console.log('socket error:' + exception);
    socket.close();
  });
  socket.on('close',function(){
    const message: App.Message = {
      ...initMessage,
      type: 'app/disconnect',
    }
    dispatcher.dispatch(message, socket)
  });
})

server.on('listening',function(){
  console.log("server listening:" + JSON.stringify(server.address()));
});

server.on("error",function(exception){
  console.log("server error:" + exception);
});


