"use strict";

const React = require("react");
const ReactDom = require("react-dom");
const Layout = require("./layout.jsx");
const ChessGameClient = require("./chessGameClient");

const client = new ChessGameClient(() => {
    ReactDom.render(<Layout client ={client} />, document.getElementById("container"));
});
