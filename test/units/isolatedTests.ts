import assert from 'assertthat';
import fs from 'fs';
import isolated from '../../lib/isolated';
import path from 'path';
import { promisify } from 'util';

const readDir = promisify(fs.readdir),
      stat = promisify(fs.stat);

const bar = path.join(__dirname, 'data', 'bar.txt'),
      foo = path.join(__dirname, 'data', 'foo.txt');

const data = path.join(__dirname, 'data');

suite('isolated', (): void => {
  test('returns an empty directory.', async (): Promise<void> => {
    const tempDirectory = await isolated();

    const files = await readDir(tempDirectory);

    assert.that(files.length).is.equalTo(0);
  });

  test('copies the specified file to the isolated directory.', async (): Promise<void> => {
    const tempDirectory = await isolated({
      files: foo
    });

    const files = await readDir(tempDirectory);

    assert.that(files.length).is.equalTo(1);
    assert.that(files[0]).is.equalTo('foo.txt');
  });

  test('copies the specified files to the isolated directory.', async (): Promise<void> => {
    const tempDirectory = await isolated({
      files: [ foo, bar ]
    });

    const files = await readDir(tempDirectory);

    assert.that(files.length).is.equalTo(2);
    assert.that(files).is.containing('foo.txt');
    assert.that(files).is.containing('bar.txt');
  });

  test('copies the specified directory to the isolated directory.', async (): Promise<void> => {
    const tempDirectory = await isolated({
      files: data
    });

    const files = await readDir(tempDirectory);

    assert.that(files.length).is.equalTo(1);
    assert.that(files).is.containing('data');
  });

  test('does not preserve timestamps on files.', async (): Promise<void> => {
    const tempDirectory = await isolated({
      files: foo
    });

    const stats = await stat(path.join(tempDirectory, 'foo.txt'));

    assert.that(stats.mtime.getTime()).is.greaterThan(Date.now() - 1000);
  });

  test('does not preserve timestamps on directories.', async (): Promise<void> => {
    const tempDirectory = await isolated({
      files: data
    });

    const statsFoo = await stat(path.join(tempDirectory, 'data', 'foo.txt'));
    const statsBar = await stat(path.join(tempDirectory, 'data', 'bar.txt'));

    assert.that(statsFoo.mtime.getTime()).is.greaterThan(Date.now() - 1000);
    assert.that(statsBar.mtime.getTime()).is.greaterThan(Date.now() - 1000);
  });

  test('preserves timestamps on request.', async (): Promise<void> => {
    const tempDirectory = await isolated({
      files: foo,
      preserveTimestamps: true
    });

    const stats = await stat(path.join(tempDirectory, 'foo.txt'));

    assert.that(stats.mtime.getTime()).is.lessThan(Date.now() - 1000);
  });
});
