var WebSocket = require('ws');
var ws = new WebSocket('ws://127.0.0.1:8080');
ws.on('open', function() {
  var now = new Date();
  ws.send('hello, ' + now);
  ws.close();
});
