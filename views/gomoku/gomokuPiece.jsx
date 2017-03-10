"use strict";

const React = require("react");
const role = require("../../games/gomoku/role");

// required attrs
// space - number
// role - gomoku role
// step - number
// x
// y

module.exports = class GomokuPiece extends React.Component {
    render() {
        const space = this.props.space;
        const x = this.props.x;
        const y = this.props.y;
        const r = this.props.role;

        const margin = Math.round(space * 0.05);
        const radius = Math.round(space / 2 - margin);

        const stroke = (r === role.black ? "black" : "white");
        const textStroke =  (r === role.black ? "white" : "black");
        const strokeWidth = space <= 50 ? 2 : 3;

        const x1 = space * x + space / 2;
        const y1 = space * y + space / 2;

        const textStyle = {
            fontSize: space / 3
        };

        return (
            <g>
                <circle cx={x1} cy={y1} r={radius-Math.min(margin,5)} stroke={stroke} strokeWidth={strokeWidth} fill={stroke} filter="url(#shadow)" />
                <text x={x1} y={y1} stroke={textStroke} style={textStyle} textAnchor="middle" dy="0.5ex" fill={textStroke}>{this.props.step}</text>
            </g>
        );
    }
};
