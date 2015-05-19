'use strict';

function MapResolver() {
  this._map = {};
}

MapResolver.prototype.resolve = function(path) {
  return this._map[path];
};

MapResolver.prototype.map = function(path, target) {
  this._map[path] = target;
};

module.exports = MapResolver;