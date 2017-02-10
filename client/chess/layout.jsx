"use strict";

const React = require("react");
const ChessGame = require("./chessGame.jsx");

module.exports = class Layout extends React.Component {
    render() {
        return (
            <table>
                <tr>
                    <td>
                        <ChessGame width="900" height="1000" />
                    </td>
                    <td>right field</td>
                </tr>
            </table>
        );
    }
};
