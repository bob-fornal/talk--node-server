import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let words = [];

async function* generateData() {
  for (let i = 0; i < words.length; i++) {
    await new Promise(resolve => setTimeout(resolve, 250));
    yield `${words[i]}\n`;
  }
}

async function openData() {
  try {
    const data = await readFile(`${__dirname}/streaming.txt`, { encoding: 'utf-8' });
    words = data.split('~~BREAK~~');
  } catch (error) {
    console.log(error);
  }
}

export default async function init(app) {
  openData();

  app.get('/streaming', async (request, response) => {
    response.writeHead(200, {
      'Content-Type': 'text/plain',
      'Transfer-Encoding': 'chunked'
    });
  
    for await (const chunk of generateData()) {
      response.write(chunk);
    }
  
    response.end();
  });
}
