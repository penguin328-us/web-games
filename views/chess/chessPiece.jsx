"use strict";

const React = require("react");
const role = require("../../games/chinese-chess/role");
const pieceType = require("../../games/chinese-chess/pieceType");

const map = [{
    role: role.red,
    pieceType: pieceType.rook,
    value: "俥"
}, {
    role: role.red,
    pieceType: pieceType.horse,
    value: "傌"
}, {
    role: role.red,
    pieceType: pieceType.bishop,
    value: "相"
}, {
    role: role.red,
    pieceType: pieceType.guard,
    value: "仕"
}, {
    role: role.red,
    pieceType: pieceType.king,
    value: "帥"
}, {
    role: role.red,
    pieceType: pieceType.cannon,
    value: "炮"
}, {
    role: role.red,
    pieceType: pieceType.pawn,
    value: "兵"
}, {
    role: role.black,
    pieceType: pieceType.rook,
    value: "車"
}, {
    role: role.black,
    pieceType: pieceType.horse,
    value: "馬"
}, {
    role: role.black,
    pieceType: pieceType.bishop,
    value: "象"
}, {
    role: role.black,
    pieceType: pieceType.guard,
    value: "士"
}, {
    role: role.black,
    pieceType: pieceType.king,
    value: "將"
}, {
    role: role.black,
    pieceType: pieceType.cannon,
    value: "砲"
}, {
    role: role.black,
    pieceType: pieceType.pawn,
    value: "卒"
}];

module.exports = class ChessPiece extends React.Component {
    render() {
        const space = this.props.space;
        const x = this.props.x;
        const y = this.props.y;
        const r = this.props.role;
        const pieceType = this.props.pieceType;

        const margin = Math.round(space * 0.05);
        const radius = Math.round(space / 2 - margin);

        const stroke = (r === role.black ? "black" : "#F44336");
        const fill = (r === role.black ? "black" : "#EF5350");
        const strokeWidth = space <= 50 ? 1 : 2;

        const x1 = space * x + space / 2;
        const y1 = space * y + space / 2;

        const textStyle = {
            fontSize: space / 2,
            fontFamily: "dfkai-sb"
        };
        let text = "";
        for (let i = 0; i < map.length; i++) {
            if (map[i].role === r && map[i].pieceType === pieceType) {
                text = map[i].value;
                break;
            }
        }


        return (
            <g style={{cursor:"pointer"}}>
                <circle cx={x1} cy={y1} r={radius-Math.min(margin,5)} stroke="black" strokeWidth={strokeWidth+1} fill="url(#chessPiece)" filter="url(#shadow)" />
                <text x={x1} y={y1} stroke={stroke} style={textStyle} textAnchor="middle" dy="0.5ex" fill={fill}>{text}</text>
            </g>
        );
    }
};
