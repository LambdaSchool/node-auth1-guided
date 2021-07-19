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

router.post('/login', (req, res, next) => {
  //
})

module.exports = router
