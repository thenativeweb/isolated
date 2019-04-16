# isolated

isolated provides one-time folders for unit tests.

## Installation

```shell
$ npm install isolated
```

## Quick Start

Using isolated is easy. All you need to do is to add a reference to it within your Node.js application:

```javascript
const isolated = require('isolated');
```

Then you can use it within your tests. In its simplest form, isolated provides a one-time folder for your test and guarantees to clean up later.

```javascript
test('...', async () => {
  const directory = await isolated();
});
```

Additionally, you may want to specify a file or a directory that isolated shall copy to the one-time directory before running your test.

```javascript
test('...', async () => {
  const directory = await isolated({
    files: 'foo.txt'
  });
});
```

If you need to copy multiple files or directories, specify an array instead of a single item.

```javascript
test('...', async () => {
  const directory = await isolated({
    files: [ 'foo.txt', 'bar.txt' ]
  });
});
```

Sometimes you may want isolate to preserve the sources' timestamps. For that additionally provide the `preserveTimestamps` option and set it to `true`.

```javascript
test('...', async () => {
  const directory = await isolated({
    files: [ 'foo.txt', 'bar.txt' ],
    preserveTimestamps: true
  });
});
```

## Running the build

To build this module use [roboter](https://www.npmjs.com/package/roboter).

```shell
$ npx roboter
```

## License

The MIT License (MIT)
Copyright (c) 2013-2019 the native web.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
