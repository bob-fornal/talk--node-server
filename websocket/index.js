import { WebSocketServer, WebSocket } from 'ws';

let wss;
let _projects;

export default function init(server, projects) {
  wss = new WebSocketServer({
    server,
    path: '/websocket'
  });
  _projects = projects;

  wss.on('connection', connection);
}

function connection(ws) {
  ws.isAlive = true;
  ws.on('pong', heartbeat);
  ws.on('message', onMessage);
  ws.on('close', onClose);
}

function onMessage(message) {
  let jsonMessage = {};
  try {
    const buffer = Buffer.from(message);
    const stringMessage = buffer.toString();
    console.log(typeof stringMessage, stringMessage);
    jsonMessage = JSON.parse(stringMessage);
  } catch (error) {
    console.log('error parsing the buffer');
  } finally {
    if (isValid(jsonMessage) === false) return;
    console.log('message sending', typeof jsonMessage, jsonMessage);
    wss.clients.forEach((client) => clientMessage(client, JSON.stringify(jsonMessage)));
  }
}

function onClose() {
  clearInterval(interval);
}

function clientMessage(client, message) {
  if (client.readyState === WebSocket.OPEN) {
    client.send(message);
  }
}

function heartbeat() {
  this.isAlive = true;
}

const interval = setInterval(function ping() {
  wss.clients.forEach(function(ws) {
    if (ws.isAlive === false) return ws.terminate();

    ws.isAlive = false;
    ws.ping();
  });
}, 30000);

function isValid(message) {
  console.log(typeof message, message);
  if (message.hasOwnProperty('type') === false) return false;
  if (message.hasOwnProperty('project') === false) return false;
  return _projects.includes(message.project);
}
