import fs from 'fs-extra';
import path from 'path';
import { promisify } from 'util';
import readDirectoryRecursive from 'recursive-readdir';
import temp, { AffixOptions } from 'temp';

const mkdir = promisify(temp.mkdir) as (affixes?: string | AffixOptions) => Promise<string>;

const isolated = async function ({ files, preserveTimestamps = false }: {
  files?: string | string[];
  preserveTimestamps?: boolean;
} = {}): Promise<string> {
  const tempDirectory = await mkdir(undefined);

  if (!files) {
    return tempDirectory;
  }

  const filesToCopy = Array.isArray(files) ? files : [ files ];

  await Promise.all(
    filesToCopy.map(async (file: string): Promise<void> => {
      const fileName = path.basename(file);

      await fs.copy(file, path.join(tempDirectory, fileName), {
        preserveTimestamps: Boolean(preserveTimestamps)
      });
    })
  );

  if (preserveTimestamps) {
    return tempDirectory;
  }

  const allFiles = await readDirectoryRecursive(tempDirectory),
        now = Date.now();

  await Promise.all(allFiles.map(async (file: string): Promise<void> => fs.utimes(file, now, now)));

  return tempDirectory;
};

export default isolated;
