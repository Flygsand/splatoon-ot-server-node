'use strict';

function Configuration(baseDir) {
  this._baseDir = baseDir;
  this.assetMap = {};
  this.settings = {};
}

Configuration.prototype.loadAssetMap = function() {
  this.assetMap = require(this._baseDir + '/assetMap.json');
};

Configuration.prototype.loadSettings = function() {
  this.settings = require(this._baseDir + '/settings.json');
};

module.exports = Configuration;