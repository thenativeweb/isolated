'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var path = require('path'),
    _require = require('util'),
    promisify = _require.promisify;

var fs = require('fs-extra'),
    readDirectoryRecursive = require('recursive-readdir'),
    temp = require('temp');

var mkdir = promisify(temp.mkdir);

var isolated =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee2() {
    var _ref2,
        files,
        _ref2$preserveTimesta,
        preserveTimestamps,
        tempDirectory,
        filesToCopy,
        allFiles,
        now,
        _args2 = arguments;

    return _regenerator.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _ref2 = _args2.length > 0 && _args2[0] !== undefined ? _args2[0] : {}, files = _ref2.files, _ref2$preserveTimesta = _ref2.preserveTimestamps, preserveTimestamps = _ref2$preserveTimesta === void 0 ? false : _ref2$preserveTimesta;
            _context2.next = 3;
            return mkdir(null);

          case 3:
            tempDirectory = _context2.sent;

            if (files) {
              _context2.next = 6;
              break;
            }

            return _context2.abrupt("return", tempDirectory);

          case 6:
            filesToCopy = files;

            if (!Array.isArray(files)) {
              filesToCopy = [files];
            }

            _context2.next = 10;
            return Promise.all(filesToCopy.map(function (file) {
              return new Promise(
              /*#__PURE__*/
              function () {
                var _ref3 = (0, _asyncToGenerator2.default)(
                /*#__PURE__*/
                _regenerator.default.mark(function _callee(resolve, reject) {
                  var fileName;
                  return _regenerator.default.wrap(function _callee$(_context) {
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
                          _context.t0 = _context["catch"](1);
                          return _context.abrupt("return", reject(_context.t0));

                        case 9:
                          resolve();

                        case 10:
                        case "end":
                          return _context.stop();
                      }
                    }
                  }, _callee, this, [[1, 6]]);
                }));

                return function (_x, _x2) {
                  return _ref3.apply(this, arguments);
                };
              }());
            }));

          case 10:
            if (!preserveTimestamps) {
              _context2.next = 12;
              break;
            }

            return _context2.abrupt("return", tempDirectory);

          case 12:
            _context2.next = 14;
            return readDirectoryRecursive(tempDirectory);

          case 14:
            allFiles = _context2.sent;
            now = Date.now();
            _context2.next = 18;
            return Promise.all(allFiles.map(function (file) {
              return fs.utimes(file, now, now);
            }));

          case 18:
            return _context2.abrupt("return", tempDirectory);

          case 19:
          case "end":
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