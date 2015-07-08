'use strict';

var fs = require('fs'),
    path = require('path');

var assert = require('assertthat');

var isolated = require('../lib/isolated');

var bar = path.join(__dirname, 'data', 'bar.txt'),
    foo = path.join(__dirname, 'data', 'foo.txt');

var data = path.join(__dirname, 'data');

suite('isolated', function () {
  /* eslint-disable handle-callback-err */
  test('returns an empty directory.', function (done) {
    isolated(function (errIsolated, directory) {
      assert.that(errIsolated).is.null();

      fs.readdir(directory, function (err, files) {
        assert.that(err).is.null();
        assert.that(files.length).is.equalTo(0);
        done();
      });
    });
  });

  test('copies the specified file to the isolated directory.', function (done) {
    isolated(foo, function (errIsolated, directory) {
      assert.that(errIsolated).is.null();

      fs.readdir(directory, function (err, files) {
        assert.that(err).is.null();
        assert.that(files.length).is.equalTo(1);
        assert.that(files[0]).is.equalTo('foo.txt');
        done();
      });
    });
  });

  test('copies the specified files to the isolated directory.', function (done) {
    isolated([ foo, bar ], function (errIsolated, directory) {
      assert.that(errIsolated).is.null();

      fs.readdir(directory, function (err, files) {
        assert.that(err).is.null();
        assert.that(files.length).is.equalTo(2);
        assert.that(files.indexOf('foo.txt')).is.not.equalTo(-1);
        assert.that(files.indexOf('bar.txt')).is.not.equalTo(-1);
        done();
      });
    });
  });

  test('copies the specified directory to the isolated directory.', function (done) {
    isolated(data, function (errIsolated, directory) {
      assert.that(errIsolated).is.null();

      fs.readdir(directory, function (err, files) {
        assert.that(err).is.null();
        assert.that(files.length).is.equalTo(1);
        assert.that(files[0]).is.equalTo('data');
        done();
      });
    });
  });
  /* eslint-enable handle-callback-err */
});
