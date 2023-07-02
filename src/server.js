import { createServer } from 'http';
import { routes } from './routes.js';

const PORT = 4000;

export const server = createServer((request, response) => {
  routes(request, response);
});

server.listen(4000, () => {
  console.log(`Server is running on Port ${PORT}`);
});
