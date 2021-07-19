module.exports = function (req, res, next) {
  if (req.session.user) {
    // 1- check 
    next()
  } else {
    next({ status: 401, message: 'you cannot touch this' })
  }
}
