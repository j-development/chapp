const net = require('net');
const readline = require('node:readline');
const { stdin: input, stdout: output } = require('node:process');
const { resolve } = require('path');
const { rejects } = require('assert');

const RL = readline.createInterface({ input, output });

let client;
let reconnectObj;
let authUser;

const responseHandler = (data) => {
  const obj = JSON.parse(data);
  if (obj.type == 'loginresponse') {
    if (obj.success) {
      console.log('Succesfully logged in!');
      return true;
    }
    if (!obj.success) {
      return false;
    }
  }
};

async function tryConnection(host, port = 0) {
  return new Promise((resolve, reject) => {
    client = net
      .createConnection({
        port: port,
        host: host,
      })
      .on('error', (err) => {
        reject(err);
      })
      .on('connect', () => {
        reconnectObj = {
          port: port,
          host: host,
        };
        console.log('connection established');
        resolve(true);
      });
  });
}

async function tryLogin(username, password) {
  return new Promise((resolve, reject) => {
    client.write(`login ${username} ${password}`, () => {
      client.on('data', (data) => {
        let res = responseHandler(data);
        if (res === false) {
          client.end();
          client = net.createConnection(reconnectObj);
          reject(false);
        } else {
          resolve(username);
        }
      });
    });
  });
}

const connectionPrompts = () => {
  RL.question('Input serveraddress\n', async (address) => {
    let [host, port, ...trash] = address.split(':');
    let res = await tryConnection(host, parseInt(port)).catch((err) => {
      console.log(err.message);
      connectionPrompts();
    });
    res ? loginPrompts() : connectionPrompts();
  });
};

const loginPrompts = () => {
  RL.question('Input "Username Password"\n', async (loginline) => {
    let [username, password, ...trash] = loginline.split(' ');
    tryLogin(username, password)
      .then((username) => {
        client.on('data', (data) => {
          console.log(JSON.parse(data));
        });
        authUser = username;
        RL.resume();
      })
      .catch((err) => {
        loginPrompts();
      });
  });
};

connectionPrompts();

loginPrompts();

RL.on('line', (input) => {
  client.write(`CHAT ${authUser} ${input}`);
});
