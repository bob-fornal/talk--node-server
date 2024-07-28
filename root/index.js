import { join } from 'path';

export default function init(app) {
  app.get('/', (request, response) => {
    response.sendFile(join(__dirname,"index.html"));
  });
}
