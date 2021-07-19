const express = require('express')
const router = express.Router()
const User = require('../users/users-model')
const bcrypt = require('bcryptjs')

router.post('/register', async (req, res, next) => {
  // 1- pull username and password from the request
  // (2- validate username & password)
  // 3- hash the password with bcrypt
  // 4- store user into db and send back nice message
  const { username, password } = req.body
  const hash = bcrypt.hashSync(password, 8) // 2 ^ 8
  const newUser = {
    username: username,
    password: hash,
  }
  const dbUser = await User.add(newUser)
  res.status(201).json({
    message: `Welcome, ${username}`,
    user: dbUser,
  })
})

router.post('/login', async (req, res, next) => {
  // 1- gather username and password from req.body
  // 2- check that the username is actually present in db
  // 3- use bcrypt to verify password against hash
  // 4- start a session for that client (library)
  // 5- send back a session id to the client in a Set-Cookie
  const { username, password } = req.body
  const user = await User.findBy({ username }).first()

  if (user && bcrypt.compareSync(password, user.password)) {
    // user by that username is in db
    // password checks out
    req.session.user = user
    res.json({
      message: 'welcome back, have a cookie!'
    })
  } else {
    // user not in db or passwerd does not check out
    res.status(401).json({
      message: 'invalid credentials',
    })
  }
})

module.exports = router
