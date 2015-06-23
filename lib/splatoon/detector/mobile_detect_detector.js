var MobileDetect = require('mobile-detect');

function MobileDetectDetector() { }

MobileDetectDetector.prototype.detect = function(userAgent) {
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
  
  return pathspec.join('/');
};

module.exports = MobileDetectDetector;
