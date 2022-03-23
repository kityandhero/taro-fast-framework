#!/usr/bin/env node

const { Command } = require("commander");
const init = require("../src/init");

const program = new Command();

program
  .command("init")
  .description("quick init your project")
  .action(() => {
    init.run();
  });

program.parse(process.argv);
