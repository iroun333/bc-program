const decodeType = 'binary';

const server = require("ws").Server;
const s = new server({ port: 8080 });
var fs = require('fs');

s.on("connection", ws => {
  ws.on("message", message => {
    console.log("Received: " + message.length);
    var decode = Buffer.from(message, decodeType);
    fs.writeFile('xxx.png', decode, function(err) {
      console.log(err);
    });
  });
});
