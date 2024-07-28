import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default function init(app) {
  app.get('/', (request, response) => {
    response.sendFile(join(__dirname,"index.html"));
  });
}
