# isolated

isolated provides one-time folders for unit tests.

## Installation

    $ npm install isolated

## Quick Start

Using isolated is easy. All you need to do is to add a reference to it within your Node.js application:

```javascript
var isolated = require('isolated');
```

Then you can use it within your tests. In its simplest form, isolated provides a one-time folder for your test and guarantees to clean up later.

```javascript
test('...', function (done) {
  isolated(function (err, directory) {
    // ...
  });
});
```

Additionally, you may want to specify a file or a directory that isolated shall copy to the one-time directory before running your test.

```javascript
test('...', function (done) {
  isolated({
    files: 'foo.txt'
  }, function (err, directory) {
    // ...
  });
});
```

If you need to copy multiple files or directories, specify an array instead of a single item.

```javascript
test('...', function (done) {
  isolated({
    files: [ 'foo.txt', 'bar.txt' ]
  }, function (err, directory) {
    // ...
  });
});
```

Sometimes you may want isolate to preserve the sources` timestamps. For that additionally provide the `preserveTimestamps` option and set it to `true`.

```javascript
test('...', function (done) {
  isolated({
    files: [ 'foo.txt', 'bar.txt' ],
    preserveTimestamps: true
  }, function (err, directory) {
    // ...
  });
});
```

## Running the build

This module can be built using [Grunt](http://gruntjs.com/). Besides running the tests, this also analyses the code. To run Grunt, go to the folder where you have installed isolated and run `grunt`. You need to have [grunt-cli](https://github.com/gruntjs/grunt-cli) installed.

    $ grunt

## License

The MIT License (MIT)
Copyright (c) 2013-2015 the native web.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
