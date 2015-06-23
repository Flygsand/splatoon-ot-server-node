'use strict';

function Server(environment, assetManager, timer, configuration) {
  this.environment = environment;
  this.assetManager = assetManager;
  this.timer = timer;
  this.configuration = configuration;
}

Server.prototype.start = function() {
  this.timer.start();
};

module.exports = Server;
