'use strict';

function RelativeResolver(base) {
  this._base = base;
}

RelativeResolver.prototype.resolve = function(path) {
  return this._base + '/' + path;
};

module.exports = RelativeResolver;