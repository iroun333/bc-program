'use strict';

const fs = require('fs');
// const CONFIG = require('./config.json');
// const event = require('./event.js');

const _sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
// const i =0;
let CONFIG = {};
let time = 5000;
const CONFIG_CHECK_TIME = 1000;


const main = async () => {
  console.log('%s time= %s', main.name, time);
  await _sleep(time);
  // console.log('i= %d', i);
  // i++;

  await main();
};

const configCheck = async () => {
  try {
    CONFIG = JSON.parse(fs.readFileSync('./config.json', 'utf-8'));
    if (CONFIG.time !== time) {
      time = CONFIG.time;
      console.log('time update %s', time);
    }
  } catch (err) {
    console.error('ERROR %s', err.message);
  }
  console.log('%s', configCheck.name);
  await _sleep(CONFIG_CHECK_TIME);

  await configCheck();
};

main();
configCheck();
