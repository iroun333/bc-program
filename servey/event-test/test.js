'use strict';

const fs = require('fs');
// const CONFIG = require('./config.json');
// const event = require('./event.js');

const _sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
let i =0;
let CONFIG = {};
let time = 1000;

const main = async () => {
  try {
    CONFIG = JSON.parse(fs.readFileSync('./config.json', 'utf-8'));
    time = CONFIG.time;
  } catch (err) {
    console.error('ERROR %s', err.message);
  }
  console.log('time= %s', time);
  await _sleep(time);
  console.log('i= %d', i);
  i++;

  await main();
  // };
};

const configCheck = async () => {

};

main();
configCheck();

console.log('second');
