"use strict";

const React = require("react");
const ChessPiece = require("./chessPiece.jsx");
const utils = require("../../games/chinese-chess/utils");

// required attrs
// chess
// space
// rotate - default = false;

module.exports = class Chess extends React.Component {
    render() {
        const rotate = this.props.rotate ? this.props.rotate : false;

        const pieces = [];
        if (this.props.chess) {
            this.props.chess.foreach((p, x, y) => {
                pieces.push(
                    <ChessPiece key={x.toString() + y.toString()} space={this.props.space} role={p.role} pieceType={p.pieceType} x={rotate?utils.maxX-x:x} y={rotate?utils.maxY-y:y} />
                );
            });
        }

        return (
            <g>
                {pieces}
            </g>
        );
    }
};
