"use strict";

const React = require("react");
const ChessBoard = require("./chessBoard.jsx");
const ChessPiece = require("./chessPiece.jsx");
const role = require("../../games/chinese-chess/role");
const pieceType = require("../../games/chinese-chess/pieceType");

module.exports = class ChessGame extends React.Component {
    constructor(props) {
        super(props);
        this.space = Math.min(
            Math.floor(this.props.width / 9),
            Math.floor(this.props.height / 10)
        );
        if (this.space % 2 !== 0) {
            this.space--;
        }
    }

    render() {
        const leftPadding = Math.floor((this.props.width - this.space * 9) / 2);
        const topPadding = Math.floor((this.props.height - this.space * 10) / 2);

        const divStyle = {
            width: this.props.width,
            height: this.props.height,
            paddingTop: topPadding,
            paddingLeft: leftPadding,
            backgroundColor: "#966F33"
        };

        return (
            <div style={divStyle}>
                <svg width={this.space*9} height={this.space*10} >
                    <ChessBoard space={this.space} />
                    <ChessPiece space={this.space} x="0" y="0" role={role.red} pieceType={pieceType.rook} />
                    <ChessPiece space={this.space} x="1" y="0" role={role.black} pieceType={pieceType.horse} />
                </svg>
            </div>
        );
    }
};
