'use strict';

function Server(environment, assetManager, configuration) {
  this.environment = environment;
  this.assetManager = assetManager;
  this.configuration = configuration;
}

module.exports = Server;