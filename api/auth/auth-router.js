const express = require('express')
const router = express.Router()
const User = require('../users/users-model')

router.post('/register', (req, res, next) => {
  // pull username and password from the request
  // validate username & password
  // hash the password
})

router.post('/login', (req, res, next) => {
  res.json('login wired!')
})

module.exports = router
