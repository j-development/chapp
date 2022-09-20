const userDB = [
  {
    username: 'foo',
    password: '123',
  },
  {
    username: 'bar',
    password: '321',
  },
];

const servicehub = (payload, client, clients) => {
  let [command, ...body] = payload.split(' ');

  let res = {};
  if (command.toUpperCase() === 'CHAT') {
    chatHandler(body[0], body, client, clients);
    return;
  }
  res = serviceActions(command.toUpperCase(), client, body);
  return res;
};

const serviceActions = (command, client, body) => {
  switch (command) {
    case 'LOGIN':
      let user = userDB.filter((user) => {
        return user.username === body[0] && user.password === body[1];
      });
      const loginresponse = {
        type: 'loginresponse',
        success: user.length === 1 ? true : false,
      };
      client.write(JSON.stringify(loginresponse));
      break;
    default:
      break;
  }
};

const chatHandler = (username, body, client, clients) => {
  body.shift();
  clients.forEach((c) => {
    if (client !== c) {
      c.write(JSON.stringify(username + ': ' + body.join(' ')));
    }
  });
};

module.exports = {
  servicehub: servicehub,
};
