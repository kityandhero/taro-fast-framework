/* eslint-disable import/no-commonjs */
let fs = require('fs');
let dayjs = require('dayjs');
const { resolve } = require('path');

function prompt(err) {
  if (err) {
    return console.error(err);
  }

  console.log('cz.flag.json update success');
}

let content = JSON.stringify({
  datetime: dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss'),
});

const filePath = resolve('./develop/assists');

fs.writeFile(`${filePath}/cz.flag.json`, content, prompt);
