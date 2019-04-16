'use strict';

const path = require('path'),
      { promisify } = require('util');

const fs = require('fs-extra'),
      readDirectoryRecursive = require('recursive-readdir'),
      temp = require('temp');

const mkdir = promisify(temp.mkdir);

const isolated = async function ({ files, preserveTimestamps = false } = {}) {
  const tempDirectory = await mkdir(null);

  if (!files) {
    return tempDirectory;
  }

  let filesToCopy = files;

  if (!Array.isArray(files)) {
    filesToCopy = [ files ];
  }

  await Promise.all(
    filesToCopy.map(file => new Promise(async (resolve, reject) => {
      const fileName = path.basename(file);

      try {
        await fs.copy(file, path.join(tempDirectory, fileName), {
          preserveTimestamps: Boolean(preserveTimestamps)
        });
      } catch (ex) {
        return reject(ex);
      }

      resolve();
    }))
  );

  if (preserveTimestamps) {
    return tempDirectory;
  }

  const allFiles = await readDirectoryRecursive(tempDirectory),
        now = Date.now();

  await Promise.all(allFiles.map(file => fs.utimes(file, now, now)));

  return tempDirectory;
};

module.exports = isolated;
