const path = require('path');
const express = require('express');
const helmet = require('helmet');
const session = require('express-session');
const store = require('connect-session-knex')(session);

const usersRouter = require('./users/users-router.js');
const authRouter = require('./auth/auth-router.js');

const server = express();

server.use(express.static(path.join(__dirname, '../client'))); // assets for our website
server.use(session({
  name: 'monkey',
  secret: 'this should come from an env var',
  cookie: {
    maxAge: 1000 * 60 * 60,
    secure: false, // if true cookien only gets set if connection is over HTTPS
    httpOnly: false, // if true the cookie cannot be read from the javascript
  },
  rolling: true,
  resave: false, // this is only necessary with some long-term session storage solutions
  saveUninitialized: false // if true we might be in violation of GDPR laws
}));
server.use(helmet());
server.use(express.json());

server.use('/api/users', usersRouter);
server.use('/api/auth', authRouter);

server.get('/hello', (req, res) => {
  if (req.headers.cookie) {
    // the server has seen this client before
    // and used Set-Cookie in a response in the past
    res.send(`<h1>hey, nice to see you again!</h1>`)
  } else {
    // it's the first visit by this client
    res.set('Set-Cookie', 'friend=yes; Max-Age=1000000;')
    res.send('<h1>Nice to meet you!</h1>')
  }
})

server.get('/', (req, res) => { // localhost:5000/ same origin as the API
  res.sendFile(path.join(__dirname, '../client', 'index.html'));
});

server.use('*', (req, res, next) => {
  next({ status: 404, message: 'not found!' });
});

server.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack,
  });
});

module.exports = server;
