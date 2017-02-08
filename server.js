const http = require('http');
const path = require('path');

const express = require('express');
const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server);

app.use(express.static(path.resolve(__dirname, 'client')));

server.listen(process.env.PORT || 8080, process.env.IP || "0.0.0.0", function(){
  var addr = server.address();
  console.log("web game server listening at", addr.address + ":" + addr.port);
});

const chessServer = require("./games/chinese-chess/chessServer");
chessServer.start(io);