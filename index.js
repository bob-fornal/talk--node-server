import * as dotenv from 'dotenv';
import express from 'express';
import streamingInit from './streaming/index.js';
import rootInit from './root/index.js';
import wsInit from './websocket/index.js';

dotenv.config();

const app = express();
streamingInit(app);
rootInit(app);

const httpServer = app.listen(process.env.PORT || 10000, () => {
  console.log(`Server running at http://localhost:${process.env.PORT || 10000}/`);
});

wsInit(httpServer);
