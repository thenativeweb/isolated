'use strict';

const path = require('path'),
      { promisify } = require('util');

const fs = require('fs-extra'),
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

      if (preserveTimestamps) {
        return resolve();
      }

      const now = new Date();

      try {
        await fs.utimes(path.join(tempDirectory, fileName), now, now);
      } catch (ex) {
        return reject(ex);
      }

      resolve();
    }))
  );

  return tempDirectory;
};

module.exports = isolated;
