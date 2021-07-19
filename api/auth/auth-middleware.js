module.exports = function(req, res, next) {
  if (req.session.user) {
    next()
  } else {
    next({ status: 401, })
  }
}
