module.exports = function (req, res, next) {
  if (req.session.user) {
    // 1- check cookie look for session id
    // 2- check there exists a session by that session id
    next()
  } else {
    next({ status: 401, message: 'you cannot touch this' })
  }
}
