var path = require('path');

function init(app) {
  app.get('/', (request, response) => {
    response.sendFile(path.join(__dirname,"index.html"));
  });
}

module.exports = init;
