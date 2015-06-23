var _ = require('lodash')
 , Gifsocket = require('gifsockets')
 , Canvas = require('canvas')
 , Image = Canvas.Image
 , BitmapFont = require('./bitmap_font');

function Timer(detector, resetInterval) {
  var self = this;

  this._detector = detector;
  this._resetInterval = resetInterval;

  this._fonts = {};
  this._sockets = {};

  _.forEach({'desktop/default': 21}, function(glyphWidth, target) {
    var font = new BitmapFont('./assets/' + target + '/font.png', glyphWidth, '0123456789:')
      , socket = new Gifsocket({
          width: 5 * glyphWidth, 
          height: font.glyphHeight
        });

    self._fonts[target] = font;
    self._sockets[target] = socket;
  });
}

Timer.prototype.start = function() {
  this._interval = setInterval(this._refresh.bind(this), 1000); 
};

Timer.prototype.addListener = function(stream, userAgent) {
  var self = this
    , target = this._detector.detect(userAgent)
    , socket = this._sockets[target];

  socket.addListener(stream, function() {
    self._renderToSocket(socket, target, self._timerString());
  });
};

Timer.prototype._refresh = function(oldTime) {
  var date = new Date()
    , elapsed = date.getHours() * 60 + date.getMinutes()
    , remaining = this._resetInterval - elapsed % this._resetInterval;

  if (remaining !== this._remaining) {
    this._remaining = remaining;
    this._render();
  }
};

Timer.prototype._render = function() {
  var self = this
    , timerString = this._timerString();
    
  _.forEach(this._sockets, function(socket, target) {
    self._renderToSocket(socket, target, timerString);
  });
};

Timer.prototype._timerString = function() {
  var remainingHours = Math.floor(this._remaining / 60)
    , remainingMinutes = this._remaining % 60;
    
  return (('00' + remainingHours).substr(-2, 2)
        + ':'
        + ('00' + remainingMinutes).substr(-2, 2));
};

Timer.prototype._renderToSocket = function(socket, target, string) {
  var font = this._fonts[target]
    , canvas = new Canvas(socket.width, socket.height)
    , ctx = canvas.getContext('2d');

  font.drawText(ctx, string);
  var rgbaPixels = ctx.getImageData(0, 0, socket.width, socket.height).data;
  socket.writeRgbaFrame(rgbaPixels);
};

module.exports = Timer;
