import * as dotenv from 'dotenv';
import express from 'express';
import streamingInit from './streaming/index.js';
import rootInit from './root/index.js';
import wsInit from './websocket/index.js';

dotenv.config();
const _port = process.env.PORT || 10000;
const _projects = process.env.SERVICES.split(',') || [];
console.log(_port, _projects);

const app = express();
streamingInit(app);
rootInit(app);

const httpServer = app.listen(_port, () => {
  console.log(`Server running at http://localhost:${_port}/`);
});

wsInit(httpServer, _projects);
