function AssetManager(detector, resolver) {
  this._detector = detector;
  this._resolver = resolver;
}

AssetManager.prototype.get = function(name, userAgent) {
  return this._resolver.resolve(this._detector.detect(userAgent) + '/' + name);
};

module.exports = AssetManager;
