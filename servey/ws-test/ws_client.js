const encodeType = 'base64';
const filename = 'banzai_boy.png';

var WebSocket = require('ws');
var ws = new WebSocket('ws://127.0.0.1:8080');
ws.on('open', function() {
  const fs = require('fs');
  const buff = fs.readFileSync(filename, encodeType);
  //console.log(buff);
  console.log('Buff: ' + buff.length);
  const sendBuff = {
    'name': filename,
    'data': buff
  };
  console.log('sendBuff: ' + sendBuff.length);

  const jsonSendBuff = JSON.stringify(sendBuff);
  console.log('jsonSendBuff= ', jsonSendBuff.length);

  ws.send(jsonSendBuff);
  ws.close();
});
