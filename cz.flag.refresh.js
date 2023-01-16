var fs = require('fs');
var dayjs = require('dayjs');

function prompt(err) {
  if (err) {
    return console.error(err);
  }

  console.log('cz.flag.json update success');
}

var content = JSON.stringify({
  datetime: dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss'),
});

fs.writeFile('cz.flag.json', content, prompt);
