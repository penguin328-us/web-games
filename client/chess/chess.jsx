"use strict";

const React = require("react");
const ChessPiece = require("./chessPiece.jsx");
const TwoDArray = require("../../games/common/twoDArray");

// required attrs
// chess
// space
// rotate - default = false;

module.exports = class Chess extends React.Component {
    render() {
        const maxX = 8;
        const maxY = 9;
        const rotate = this.props.rotate ? this.props.rotate : false;

        const pieces = [];
        if (this.props.chess) {
            this.props.chess.foreach((p, x, y) => {
                pieces.push(
                    <ChessPiece space={this.props.space} role={p.role} pieceType={p.pieceType} x={rotate?maxX-x:x} y={rotate?maxY-y:y} />
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
