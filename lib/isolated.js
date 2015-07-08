'use strict';

var path = require('path');

var _ = require('lodash'),
    async = require('async'),
    fs = require('fs-extra'),
    temp = require('temp');

var isolated = function (files, callback) {
  if (!callback) {
    callback = files;
    files = undefined;
  }

  temp.mkdir(null, function (errMkdir, directory) {
    if (errMkdir) {
      return callback(errMkdir);
    }

    if (!files) {
      return callback(null, directory);
    }

    files = _.flatten([ files ]);

    async.each(files, function (fileWithPath, done) {
      var fileWithoutPath = path.basename(fileWithPath);

      fs.copy(fileWithPath, path.join(directory, fileWithoutPath), {
        preserveTimestamps: true
      }, function (errCopy) {
        if (errCopy) {
          return done(errCopy);
        }
        done(null);
      });
    }, function (errEach) {
      if (errEach) {
        return callback(errEach);
      }
      callback(null, directory);
    });
  });
};

module.exports = isolated;
