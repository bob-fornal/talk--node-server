// const http = require('http');

const config = require('./config.js');
const express = require('express');
const app = express();

const streamingInit = require('./streaming/index.js');
streamingInit(app);

app.listen(config.PORT, () => {
  console.log(`Server running at http://localhost:${process.env.PORT || 10000}/`);
});
