'use strict';

var MapResolver = require('./resolver/map_resolver')
  , RelativeResolver = require('./resolver/relative_resolver')
  , MobileDetectDetector = require('./detector/mobile_detect_detector')
  , AssetManager = require('./asset_manager')
  , ConfigurationFactory = require('./configuration_factory')
  , Timer = require('./timer')
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

  var detector = new MobileDetectDetector();
  
  return new Server('production', new AssetManager(detector, resolver), new Timer(detector, 240), configuration);
};

ServerFactory.prototype._createDevelopmentServer = function() {
  var configurationFactory = new ConfigurationFactory(this._root + '/config/development');
  
  var configuration = configurationFactory.createConfiguration(function(config) {
    config.loadSettings();
  });

  var detector = new MobileDetectDetector();
  
  return new Server('development', new AssetManager(detector, new RelativeResolver(configuration.settings.resolver.base)), new Timer(detector, 240), configuration);
};

module.exports = ServerFactory;
