import { createServer } from 'http';
import { routes } from './routes.js';

const PORT = process.env.PORT || 3001

export const server = createServer((request, response) => {
  routes(request, response);
});

server.listen(PORT, () => {
  console.log(`Server is running on Port ${PORT}`);
});
