import { createServer } from 'http';
import { parse } from 'url';
import { readFileSync } from 'fs';
import querystring from 'querystring';
const data = [
  {
    username: 'banana',
    age: '32',
    hobbies: ['task 3', 'task 4'],
  },
];

const PORT = 4000;

const server = createServer((req, res) => {
  const urlParse = parse(req.url, true);

  console.log('Server request');

  if (urlParse.pathname == '/users' && req.method == 'GET') {
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify(data, null, 2));
  }
});

server.listen(4000, () => {
  console.log(`listening port ${PORT}`);
});
