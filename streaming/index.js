const fs = require('node:fs/promises');

let words = [];

async function* generateData() {
  for (let i = 0; i < words.length; i++) {
    await new Promise(resolve => setTimeout(resolve, 100));
    yield `${words[i]}\n`;
  }
}

async function openData() {
  try {
    const data = await fs.readFile(`${__dirname}/streaming.txt`, { encoding: 'utf-8' });
    words = data.split('~~BREAK~~');
  } catch (error) {
    console.log(error);
  }
}

async function init(app) {
  openData();

  app.get('/streaming', async (request, response) => {
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
}

module.exports = init;
