# isolated

isolated provides one-time folders for unit tests.

## Status

| Category         | Status                                                                                                                                       |
| ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| Version          | [![npm](https://img.shields.io/npm/v/isolated)](https://www.npmjs.com/package/isolated)                                                      |
| Dependencies     | ![David](https://img.shields.io/david/thenativeweb/isolated)                                                                                 |
| Dev dependencies | ![David](https://img.shields.io/david/dev/thenativeweb/isolated)                                                                             |
| Build            | [![CircleCI](https://img.shields.io/circleci/build/github/thenativeweb/isolated)](https://circleci.com/gh/thenativeweb/isolated/tree/master) |
| License          | ![GitHub](https://img.shields.io/github/license/thenativeweb/isolated)                                                                       |

## Installation

```shell
$ npm install isolated
```

## Quick Start

Using isolated is easy. All you need to do is to add a reference to it within your Node.js application:

```javascript
const { isolated } = require('isolated');
```

If you use TypeScript, use the following code instead:

```typescript
import { isolated } from 'isolated';
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
