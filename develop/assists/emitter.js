/* eslint-disable no-undef */
/* eslint-disable import/no-commonjs */
/* eslint-disable unicorn/prefer-module */
/* eslint-disable no-useless-escape */

const EventEmitter = require('node:events');

// eslint-disable-next-line unicorn/prefer-event-target
const emitter = new EventEmitter();

console.log('set setMaxListeners 100');

emitter.setMaxListeners(100);
