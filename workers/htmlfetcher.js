var archive = require('../helpers/archive-helpers');

var worker = function() {
  archive.readListOfUrls( (urlList) => {
    archive.downloadUrls(urlList, (url) => {
      archive.downloadUrl(url);
    });
  });
};

worker();
