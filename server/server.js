const { servicehub } = require('./servicehub');
var net = require('net');

const clients = [];
const server = net.createServer((c) => {
  c.on('end', () => {
    console.log('Client disconnected');
  });
});

server.on('error', (err) => {
  throw err;
});

server.listen(3050, () => {
  console.log('server is listening');
});

server.on('connection', (client) => {
  clients.push(client);
  console.log('Client connected!');
  client.on('data', (data) => {
    servicehub(data.toString('utf-8'), client, clients);
  });
});
