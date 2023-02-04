/* eslint-disable import/no-commonjs */
try {
  const shell = require('shelljs');

  const { loopPackage } = require('./package.assist');

  const ncuCommand = `npx rimraf ./yarn-error.log && npx rimraf ./yarn.lock && npx rimraf ./package-lock.json && npx rimraf ./src/.umi && npx rimraf ./node_modules`;

  function adjustMainPackageJson() {
    shell.exec(ncuCommand);
  }

  function adjustChildrenPackageJson() {
    loopPackage(({ name }) => {
      shell.exec(`cd ./packages/${name} && ${ncuCommand}`);
    });
  }

  console.log(`clean start`);
  console.log('');

  shell.exec(`lerna clean -y`);

  adjustChildrenPackageJson();

  adjustMainPackageJson();

  console.log('clean success');
} catch {}
