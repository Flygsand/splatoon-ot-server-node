'use strict';

var MapResolver = require('./resolver/map_resolver')
  , RelativeResolver = require('./resolver/relative_resolver')
  , AssetManager = require('./asset_manager')
  , ConfigurationFactory = require('./configuration_factory')
  , Server = require('./server');

function ServerFactory(root) {
  this._root = root;
}

ServerFactory.prototype.createServer = function() {
  if (process.env.NODE_ENV === 'production') {
    return this._createProductionServer();
  } else {
    return this._createDevelopmentServer();
  }
};

ServerFactory.prototype._createProductionServer = function() {
  var resolver = new MapResolver()
    , configurationFactory = new ConfigurationFactory(this._root + '/config/production');
    
  var configuration = configurationFactory.createConfiguration(function(config) {
    config.loadAssetMap();
  });
  
  for (var path in configuration.assetMap) {
    resolver.map(path, configuration.assetMap[path]);
  }
  
  return new Server('production', new AssetManager(resolver), configuration);
};

ServerFactory.prototype._createDevelopmentServer = function() {
  var configurationFactory = new ConfigurationFactory(this._root + '/config/development');
  
  var configuration = configurationFactory.createConfiguration(function(config) {
    config.loadSettings();
  });
  
  return new Server('development', new AssetManager(new RelativeResolver(configuration.settings.resolver.base)), configuration);
};

module.exports = ServerFactory;