'use strict';

var connect = require('connect')
  , query = require('./middleware/query')
  , serveStatic = require('serve-static')
  , ServerFactory = require('./server_factory');

var serverFactory = new ServerFactory(__dirname + '/../..')
  , server = serverFactory.createServer()
  , app = connect();

app.use(query());
app.use('/image.php', require('./route/image')(server));
app.use('/timer.gif', require('./route/timer')(server));
app.use(serveStatic(__dirname + '/public'));

server.start();

module.exports = app;
