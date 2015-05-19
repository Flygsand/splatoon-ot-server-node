var Qs = require('qs')
  , parseurl = require('parseurl');

module.exports = function query() {
  return function query(req, res, next) {
    if (!req.query) {
      req.query = ~req.url.indexOf('?')
        ? Qs.parse(parseurl(req).query)
        : {};
    }

    next();
  };
};

