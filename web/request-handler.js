var path = require('path');
var archive = require('../helpers/archive-helpers');
// require more modules/folders here!


exports.handleRequest = function (req, res) {

  if (req.method === 'GET') {

    if ( req.url === '/') {
      res.end('/<input type="input" name="url">/');

    } else {
      var cb = function (isInArchive) {

        if (isInArchive) {
          res.statusCode = 200;
          res.writeHead(res.statusCode, archive.headers);
          archive.readArchivedFile(req.url, (data) => {
            res.end(data);
          });

        } else {
          // not present branch
          res.statusCode = 404;
          res.writeHead(res.statusCode, archive.headers);
          res.end(); // we will need to return ./web/public/loading.html
        }
      };
      archive.isUrlArchived( req.url, cb);
      // For all but '/':
    }

  } else if (req.method === 'POST') {
    //var url = req.url.replace('/?', '');
    let tempUrl;
    let body = '';
    req.on('data', (chunk) => { req.url = chunk.toString().split('=')[1]; } );
    req.on('end', () => {
      archive.addUrlToList(req.url, () => {
        res.statusCode = 302;
        res.writeHead(res.statusCode, archive.headers);
        res.end();
      });
    });

  } else {
    res.end(archive.paths.list);
  }
};
