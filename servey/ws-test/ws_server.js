const decodeType = 'base64';

const server = require("ws").Server;
const s = new server({ port: 8080 });
var fs = require('fs');

s.on("connection", ws => {
  ws.on("message", message => {
    console.log("Received: " + message.length);
    const buff = JSON.parse(message);
    console.log('filename= ' + buff.name);
    var decode = Buffer.from(buff.data, decodeType);
    fs.writeFile('xxx.png', decode, function(err) {
      console.log(err);
    });
  });
});
