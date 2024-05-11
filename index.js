// const http = require('http');

const express = require('express');
const app = express();
const PORT = 3000;

const longText = 'This is long text that can be used to test the node backend, and more.';
const words = longText.split(' ');

async function* generateData() {
  for (let i = 0; i < words.length; i++) {
    await new Promise(resolve => setTimeout(resolve, 100));
    yield `${words[i]}\n`;
  }
}

app.get('/', async (request, response) => {
  response.writeHead(200, {
    'Content-Type': 'text/plain',
    'Transfer-Encoding': 'chunked'
  });

  for await (const chunk of generateData()) {
    response.write(chunk);
    console.log(`Sent: ${chunk}`);
  }

  response.end();
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});

// const server = http.createServer(async (request, response) => {
//   response.writeHead(200, {
//     'Content-Type': 'text/plain',
//     'Transfer-Encoding': 'chunked'
//   });

//   for await (const chunk of generateData()) {
//     response.write(chunk);
//     console.log(`Sent: ${chunk}`);
//   }

//   response.end();
// });

// server.listen(PORT, () => {
//   console.log(`Server running at http://localhost:${PORT}/`);
// });
