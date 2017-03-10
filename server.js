const http = require('http');
const path = require('path');

const express = require('express');
const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server);

app.use(express.static(path.resolve(__dirname, 'client')));

server.listen(process.env.PORT || 8080, process.env.IP || "0.0.0.0", function() {
  var addr = server.address();
  console.log("web game server listening at", addr.address + ":" + addr.port);
});

const chessServer = require("./games/chinese-chess/chessServer");
chessServer.start(io);

const gomokuServer = require("./games/gomoku/gomokuServer");
gomokuServer.start(io);

app.use("/newgame", (req, res) => {
  const game = req.query.game;
  if (game) {
    const room = new Date().getTime().toString(10);
    res.redirect(`/${game}/index.html?room=${room}`);
  }
});
