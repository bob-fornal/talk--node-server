const ws = require('ws');

function init(httpServer) {
  const wss = new ws.WebSocketServer({ noServer: true });

  wss.on('connection', function connection(ws) {
    ws.on('message', function message(data) {
      console.log('received: %s', data);
    });
  
    ws.send('something');
  });

  httpServer.on('upgrade', (req, socket, head) => {
    wss.handleUpgrade(req, socket, head, (ws) => {
      wss.emit('connection', ws, req);
    });
  });
}

module.exports = init;
