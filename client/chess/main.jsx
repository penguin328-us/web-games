"use strict";

const React = require("react");
const ReactDom = require("react-dom");
const Layout = require("./layout.jsx");
const ChessGameClient = require("./chessGameClient");

import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

injectTapEventPlugin();

const client = new ChessGameClient(() => {
    ReactDom.render((
        <MuiThemeProvider>
            <Layout client ={client} />
        </MuiThemeProvider>
    ), document.getElementById("container"));
});
