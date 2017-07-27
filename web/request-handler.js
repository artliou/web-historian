var path = require('path');
var archive = require('../helpers/archive-helpers');
// require more modules/folders here!


exports.handleRequest = function (req, res) {

  if (req.method === 'GET' && req.url === '/') {
    res.end('/<input type="input" name="url">/');
    return;
  }

  res.end(archive.paths.list);
};
