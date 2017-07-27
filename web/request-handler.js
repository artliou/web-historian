var path = require('path');
var archive = require('../helpers/archive-helpers');
// require more modules/folders here!


exports.handleRequest = function (req, res) {

  if (req.method === 'GET') {
    if ( req.url === '/') {
      res.end('/<input type="input" name="url">/');

    } else {
      // For all but '/':
      res.statusCode = 200;
      res.writeHead(res.statusCode, archive.headers);
      archive.readArchivedFile(req.url, (data) => {
        res.end(data);
      });
    }
  } else if (req.method === 'POST') {
    var url = req.url.replace('/?', '');
    archive.addUrlToList(url);
    res.statusCode = 302;
    res.writeHead(res.statusCode, archive.headers);
    res.end();

  } else {
    res.end(archive.paths.list);
  }
};
