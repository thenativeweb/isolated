'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var path = require('path'),
    _require = require('util'),
    promisify = _require.promisify;


var fs = require('fs-extra'),
    readDirectoryRecursive = require('recursive-readdir'),
    temp = require('temp');

var mkdir = promisify(temp.mkdir);

var isolated = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
    var _this = this;

    var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        files = _ref2.files,
        _ref2$preserveTimesta = _ref2.preserveTimestamps,
        preserveTimestamps = _ref2$preserveTimesta === undefined ? false : _ref2$preserveTimesta;

    var tempDirectory, filesToCopy, allFiles, now;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return mkdir(null);

          case 2:
            tempDirectory = _context2.sent;

            if (files) {
              _context2.next = 5;
              break;
            }

            return _context2.abrupt('return', tempDirectory);

          case 5:
            filesToCopy = files;


            if (!Array.isArray(files)) {
              filesToCopy = [files];
            }

            _context2.next = 9;
            return _promise2.default.all(filesToCopy.map(function (file) {
              return new _promise2.default(function () {
                var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(resolve, reject) {
                  var fileName;
                  return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          fileName = path.basename(file);
                          _context.prev = 1;
                          _context.next = 4;
                          return fs.copy(file, path.join(tempDirectory, fileName), {
                            preserveTimestamps: Boolean(preserveTimestamps)
                          });

                        case 4:
                          _context.next = 9;
                          break;

                        case 6:
                          _context.prev = 6;
                          _context.t0 = _context['catch'](1);
                          return _context.abrupt('return', reject(_context.t0));

                        case 9:

                          resolve();

                        case 10:
                        case 'end':
                          return _context.stop();
                      }
                    }
                  }, _callee, _this, [[1, 6]]);
                }));

                return function (_x2, _x3) {
                  return _ref3.apply(this, arguments);
                };
              }());
            }));

          case 9:
            if (!preserveTimestamps) {
              _context2.next = 11;
              break;
            }

            return _context2.abrupt('return', tempDirectory);

          case 11:
            _context2.next = 13;
            return readDirectoryRecursive(tempDirectory);

          case 13:
            allFiles = _context2.sent;
            now = Date.now();
            _context2.next = 17;
            return _promise2.default.all(allFiles.map(function (file) {
              return fs.utimes(file, now, now);
            }));

          case 17:
            return _context2.abrupt('return', tempDirectory);

          case 18:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function isolated() {
    return _ref.apply(this, arguments);
  };
}();

module.exports = isolated;