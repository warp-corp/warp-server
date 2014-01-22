module.exports = function() {
  return function requestLoggerMiddleware(req, res, next) {
    req.log.info({
      method: req.method,
      url: req.url,
      user: req.username
    });
    return next();
  };
};