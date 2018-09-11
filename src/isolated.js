'use strict';

var path = require('path');

var _ = require('lodash'),
    async = require('async'),
    fs = require('fs-extra'),
    temp = require('temp');

var isolated = function (options, callback) {
  if (!callback) {
    callback = options;
    options = {};
  }

  options.files = options.files || undefined;
  options.preserveTimestamps = !!options.preserveTimestamps;

  temp.mkdir(null, function (errMkdir, directory) {
    var files;

    if (errMkdir) {
      return callback(errMkdir);
    }

    if (!options.files) {
      return callback(null, directory);
    }

    files = _.flatten([ options.files ]);

    async.each(files, function (fileWithPath, done) {
      var fileWithoutPath = path.basename(fileWithPath);

      fs.copy(fileWithPath, path.join(directory, fileWithoutPath), {
        preserveTimestamps: options.preserveTimestamps
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
