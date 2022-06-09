const { resolve } = require("path");
const fs = require("fs-extra");
const term = require("terminal-kit").terminal;

exports.run = async function (s, o) {
  term.green(`adjust develop environment\r`);

  const packageProjectPath = resolve(`./package.json`);

  fs.readJson(packageProjectPath)
    .then((p) => {
      p.dependencies = {};
      p.devDependencies = {};

      fs.writeJson(packageProjectPath, p)
        .then(() => {
          term.green(`adjust package.json success!\r`);

          process.exit();
        })
        .catch((err) => {
          console.error(err);

          process.exit();
        });
    })
    .catch((err) => {
      console.error(err);

      process.exit();
    });
};
