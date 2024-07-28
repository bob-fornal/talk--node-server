import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ noServer: true });

export default function init(httpServer) {
  wss.on('connection', connection);

  httpServer.on('upgrade', (req, socket, head) => {
    wss.handleUpgrade(req, socket, head, (ws) => {
      wss.emit('connection', ws, req);
    });
  });
}

function connection(ws) {
  ws.isAlive = true;
  ws.on('pong', heartbeat);
  ws.on('message', onMessage);
}

function onMessage(message) {
  let jsonMessage = {};
  try {
    const buffer = Buffer.from(message);
    const stringMessage = buffer.toString();
    jsonMessage = JSON.parse(stringMessage);  
  } catch (error) {
    console.log('error parsing the buffer');
  } finally {
    if (isValid(jsonMessage) === false) return;
    wss.clients.forEach((client) => clientMessage(client, message));  
  }
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

wss.on('close', function() {
  clearInterval(interval);
});

function isValid(message) {
  if (message.hasOwnProperty('type') === false) return false;
  if (message.hasOwnProperty('project') === false) return false;
  if (message.project !== 'talk-presentation-tool') return false;
  return true;
}
