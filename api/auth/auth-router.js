const express = require('express')
const router = express.Router()
const User = require('../users/')

router.post('/register', (req, res, next) => {
  res.json('register wired!')
})

router.post('/login', (req, res, next) => {
  res.json('login wired!')
})

module.exports = router
