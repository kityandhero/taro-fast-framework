/* eslint-disable import/no-commonjs */

const shell = require('shelljs');

const { loopPackage } = require('./package.assist');

function adjustMainPackageJson(cmd) {
  shell.exec(cmd);
}

function adjustChildrenPackageJson(cmd) {
  loopPackage(({ name }) => {
    shell.exec(`cd ./packages/${name} && ${cmd}`);
  });
}

function updateSpecial(packageList) {
  const ncuCommand = `npx ncu -u ${packageList.join(
    ' ',
  )} --packageFile package.json`;

  console.log(`${packageList.join()} will check update`);
  console.log('');

  adjustMainPackageJson(ncuCommand);

  adjustChildrenPackageJson(ncuCommand);

  console.log('update success');
}

function updateAll() {
  const ncuCommand = `npx ncu -u --packageFile package.json`;

  console.log(`all packages will update`);
  console.log('');

  adjustMainPackageJson(ncuCommand);

  adjustChildrenPackageJson(ncuCommand);

  console.log('update success');
}

function checkAll() {
  const ncuCommand = `npx ncu -u --packageFile package.json`;

  console.log(`all packages will check update`);
  console.log('');

  adjustMainPackageJson(ncuCommand);

  adjustChildrenPackageJson(ncuCommand);

  console.log('update success');
}

module.exports = { checkAll, updateSpecial, updateAll };
