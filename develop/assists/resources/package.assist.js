/* eslint-disable import/no-commonjs */

const fs = require('fs');

const { resolve } = require('path');

function loopPackage(
  callback = ({
    // eslint-disable-next-line no-unused-vars
    name,
    // eslint-disable-next-line no-unused-vars
    absolutePath,
    // eslint-disable-next-line no-unused-vars
    relativePath,
  }) => {},
) {
  const packagesDir = './packages/';

  const packagesPath = resolve(packagesDir);

  fs.readdir(packagesDir, (err, files) => {
    if (err) {
      throw err;
    }

    files.forEach((file) => {
      const itemPath = `${packagesPath}/${file}`;

      if (file && fs.lstatSync(itemPath).isDirectory()) {
        callback({
          name: file,
          absolutePath: itemPath,
          relativePath: `./packages/${file}`,
        });
      }
    });
  });
}

module.exports = { loopPackage };
