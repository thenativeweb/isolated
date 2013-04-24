'use strict';

var path = require('path');

var _ = require('underscore'),
    async = require('async'),
    fs = require('fs-extra'),
    temp = require('temp');

var isolated = function (files, callback) {
  if (!callback) {
    callback = files;
    files = undefined;
  }

  temp.mkdir(null, function (err, directory) {
    if (err) { return callback(err); }

    if (!files) {
      return callback(null, directory);
    }

    files = _.flatten([ files ]);

    async.each(files, function (fileWithPath, callback) {
      var fileWithoutPath = path.basename(fileWithPath);
      fs.copy(fileWithPath, path.join(directory, fileWithoutPath), function (err) {
        if (err) { return callback(err); }
        callback(null);
      });
    }, function (err) {
      if (err) { return callback(err); }
      callback(null, directory);
    });
  });
};

module.exports = isolated;