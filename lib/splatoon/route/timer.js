module.exports = function(server) {
  return function(req, res) {
  
    res.writeHead(200, {
      'Connection': 'Keep-Alive',
      'Content-Type': 'image/gif',
      'Transfer-Encoding': 'chunked'
    });

    server.timer.addListener(res, req.headers['user-agent']);

  };
};
