/* eslint-disable import/no-commonjs */
try {
  const shell = require('shelljs');
  const fs = require('fs');

  const { resolve } = require('path');

  const ncuCommand = `npx rimraf ./yarn-error.log && npx rimraf ./yarn.lock && npx rimraf ./package-lock.json && npx rimraf ./src/.umi && npx rimraf ./node_modules`;

  function adjustMainPackageJson() {
    shell.exec(ncuCommand);
  }

  function adjustChildrenPackageJson() {
    const packagesDir = './packages/';

    const packagesPath = resolve(packagesDir);

    fs.readdir(packagesDir, (err, files) => {
      if (err) {
        throw err;
      }

      files.forEach((file) => {
        const itemPath = `${packagesPath}/${file}`;

        if (file && fs.lstatSync(itemPath).isDirectory()) {
          shell.exec(`cd ./packages/${file} && ${ncuCommand}`);
        }
      });
    });
  }

  console.log(`clean start`);
  console.log('');

  shell.exec(`lerna clean -y`);

  adjustChildrenPackageJson();

  adjustMainPackageJson();

  console.log('clean success');
} catch {}
