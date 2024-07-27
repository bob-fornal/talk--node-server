require('dotenv').config();
const express = require('express');
const app = express();

const streamingInit = require('./streaming/index.js');
streamingInit(app);

const rootInit = require('./root/index.js');
rootInit(app);

const httpServer = app.listen(process.env.PORT || 10000, () => {
  console.log(`Server running at http://localhost:${process.env.PORT || 10000}/`);
});

const wsInit = require('./websocket/index.js');
wsInit(httpServer);
