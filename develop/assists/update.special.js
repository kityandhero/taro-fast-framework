/* eslint-disable import/no-commonjs */

const shell = require('shelljs');
const fs = require('fs');

const { resolve } = require('path');

const packageList = ['easy-soft-dva', 'easy-soft-utility'];

const ncuCommand = `npx ncu -u ${packageList.join(
  ' ',
)} --packageFile package.json`;

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

console.log(`${packageList.join()} will check update`);
console.log('');

adjustMainPackageJson();

adjustChildrenPackageJson();

console.log('update success');
