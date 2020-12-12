const encodeType = 'binary';
const filename = 'banzai_boy.png';

var WebSocket = require('ws');
var ws = new WebSocket('ws://127.0.0.1:8080');
ws.on('open', function() {
  var now = new Date();

  const fs = require('fs');
  const buff = fs.readFileSync(filename, encodeType);
  console.log(buff);
  console.log('Send: ' + buff.length);

  ws.send(buff);
  ws.close();
});
