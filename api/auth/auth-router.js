const express = require('express')
const router = express.Router()
const User = require('../users/users-model')
const bcrypt = require('bcryptjs')

router.post('/register', (req, res, next) => {
  // pull username and password from the request
  // validate username & password
  // hash the password with bcrypt
})

router.post('/login', (req, res, next) => {
  res.json('login wired!')
})

module.exports = router
