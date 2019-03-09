const PORT = 8086;
const HOST = '192.168.1.102';

const client = new WebSocket(`ws://${HOST}:${PORT}`);
const originalSend = client.send
let bufferedMessages: Array<any> = []

client.send = (message) => {
  if (client.readyState === WebSocket.OPEN) {
    originalSend(message)
  } else {
    bufferedMessages.push(message)
  }
}

client.onmessage = (ev) => {
  console.log(ev.data)
}
client.onopen = () => {
  console.log('start')
  bufferedMessages.forEach(m => {
    originalSend(m)
  })
  bufferedMessages = []
}
client.onerror = (e) => {
  console.dir(e)
}
client.onclose = () => {
  console.log('close')
}

const getSocketClient = () => {
  return client
}


export {
  getSocketClient
}