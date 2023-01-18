#!/usr/bin/env node

const { Command } = require('commander');
const init = require('../src/init');
const env = require('../src/env');
const clear = require('../src/clear');

const program = new Command();

process.title = 'taro-fast-cli';

program.version(require('../package').version).usage('<command> [options]');

program
  .command('init')
  .description('quick init your project')
  .action(() => {
    init.run();
  });

program
  .command('env')
  .description('install dev environment')
  .option('--agent <char>', 'dev environment from target remote package')
  .option('--file <char>', 'dev environment from target local package')
  .action((a, o) => {
    env.run(a, o);
  });

program
  .command('clear')
  .description('install dev environment')
  .action((a, o) => {
    clear.run(a, o);
  });

program.parse(process.argv);
