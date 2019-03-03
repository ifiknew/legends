
const PORT = 8086;
const HOST = 'localhost';

const client = new WebSocket(`ws://${HOST}:${PORT}`);

client.onmessage = (ev) => {
  console.log(ev.data)
}
client.onopen = () => {
  console.log('start')
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

export default getSocketClient