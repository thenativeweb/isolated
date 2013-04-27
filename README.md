# isolated

isolated provides one-time folders for unit tests.

If you have any questions or feedback, feel free to contact me using [@goloroden](https://twitter.com/goloroden) on Twitter.

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
  isolated('foo.txt', function (err, directory) {
    // ...
  });
});
```

If you need to copy multiple files or directories, specify an array instead of a single item.

Then you can use it within your tests. In its simplest form, isolated provides a one-time folder for your test and guarantees to clean up later.

```javascript
test('...', function (done) {
  isolated([ 'foo.txt', 'bar.txt' ], function (err, directory) {
    // ...
  });
});
```

## Running the tests

isolated has been developed using TDD. To run the tests, go to the folder where you have installed isolated to and run `npm test`. You need to have [mocha](https://github.com/visionmedia/mocha) installed.

    $ npm test

Additionally, this module can be built using [Grunt](http://gruntjs.com/). Besides running the tests, Grunt also analyses the code using [JSHint](http://www.jshint.com/). To run Grunt, go to the folder where you have installed isolated and run `grunt`. You need to have [grunt-cli](https://github.com/gruntjs/grunt-cli) installed.

    $ grunt
