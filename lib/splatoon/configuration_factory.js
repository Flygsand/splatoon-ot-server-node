'use strict';

var Configuration = require('./configuration');

function ConfigurationFactory(baseDir) {
  this._baseDir = baseDir;
}

ConfigurationFactory.prototype.createConfiguration = function(initializer) {
  var configuration = new Configuration(this._baseDir);
  
  if (typeof initializer === 'function') {
    initializer.call(undefined, configuration);
  }
  
  return configuration;
};

module.exports = ConfigurationFactory;