module.exports = function(server) {
  return function(req, res, next) {
    var name = req.query.name;

    if (!name) {
      res.writeHead(404);
      res.end();
    }
    
    var url = server.assetManager.get(name, req.headers['user-agent']);
    
    if (!url) {
      res.writeHead(404);
      res.end();
    } else {
      res.writeHead(301, {Location: url});
      res.end();
    }
  };
};
