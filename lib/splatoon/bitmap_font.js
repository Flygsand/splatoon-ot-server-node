var fs = require('fs')
  , Image = require('canvas').Image
  , _ = require('lodash');

function BitmapFont(path, glyphWidth, glyphList) {
  var glyphImage = new Image();
  glyphImage.src = fs.readFileSync(path);
  this._glyphImage = glyphImage;

  this.glyphWidth = glyphWidth;
  this.glyphHeight = glyphImage.height;
  this._glyphOffset = _.reduce(glyphList.split(''), function(offset, glyph, i) {
    offset[glyph] = i * glyphWidth;
    return offset;
  }, {});
}

BitmapFont.prototype.drawText = function(ctx, string) {
  var self = this;

  _.forEach(string.split(''), function(ch, i) {
    ctx.drawImage(self._glyphImage, self._glyphOffset[ch], 0, self.glyphWidth, self.glyphHeight, self.glyphWidth * i, 0, self.glyphWidth, self.glyphHeight);
  });
};

module.exports = BitmapFont;
