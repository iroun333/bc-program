'use strict';

const fs = require('fs');
const _sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

let CONFIG = {};

// ★
let time = 5; // 初期値 file read NGの場合のfail safe
const WAIT_TIME = 1000;
let cancelFlg = false;

/**
 * メイン処理
 *
 */
const main = async () => {
  console.log('%s time= %s', main.name, time);
  await sleep(time);
  // await _sleep(1000);

  await main();
};

// ★
/**
 * configファイルチェック処理
 * 一定周期でconfigファイルを読み込む
 *
 */
const configCheck = async () => {
  try {
    CONFIG = JSON.parse(fs.readFileSync('./config.json', 'utf-8'));
    if (CONFIG.time !== time) {
      time = CONFIG.time;
      console.log('%s time update %s', configCheck.name, time);
      cancelFlg = true;
    }
  } catch (err) {
    // read error 発生時は次の周期で
    console.error('ERROR %s', err.message);
  }
  // console.log('%s', configCheck.name);
  await _sleep(WAIT_TIME);

  await configCheck();
};

// ★
/**
 * キャンセル可能なsleep処理
 *
 * @param {*} sec
 */
const sleep = async (sec) => {
  for (let i=0; i<sec; i++) {
    if (cancelFlg) {
      cancelFlg = false;
      console.log('%s cancel', sleep.name);
      break;
    }
    await _sleep(WAIT_TIME);
  }
};


main();
configCheck();
