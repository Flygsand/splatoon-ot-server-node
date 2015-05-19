'use strict';

var connect = require('connect')
  , query = require('./middleware/query')
  , serveStatic = require('serve-static');
  
var app = connect();

app.use(query());
app.use('/image.php', require('./route/image'));
app.use(serveStatic(__dirname + '/public'));

module.exports = app;