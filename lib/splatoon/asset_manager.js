var MobileDetect = require('mobile-detect');

function AssetManager(resolver) {
  this._resolver = resolver;
}

AssetManager.prototype.get = function(name, userAgent) {
  var pathspec = []
    , detector = new MobileDetect(userAgent);
  
  if (detector.mobile()) {
    pathspec.push('mobile');
    
    if (detector.match('Galaxy.*Nexus')) {
      pathspec.push('xhdpi');
    } else {
      pathspec.push('default');
    }
  } else {
    pathspec.push('desktop', 'default');
  }
  
  pathspec.push(name);
    
  return this._resolver.resolve(pathspec.join('/'));
};

module.exports = AssetManager;