"use strict";

const React = require("react");
const ChessPiece = require("./chessPiece.jsx");
const utils = require("../../games/chinese-chess/utils");

// required attrs
// chess
// lastStep
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

        const lastSteps = [];
        if (this.props.lastStep) {
            const margin = Math.round(this.props.space * 0.03);
            const radius = Math.round(this.props.space / 2 - margin);
            const from = this.props.lastStep.from;
            let point = this.getCenterPoint(from, this.props.space, rotate, 0);
            lastSteps.push(
                <circle key={from.x.toString() + from.y.toString()} cx={point.cx} cy={point.cy} r={radius} strokeDasharray="5,5" stroke="#FFC400" strokeWidth="2" fill="none" />
            );
            const to = this.props.lastStep.to;

            point = this.getCenterPoint(to, this.props.space, rotate, 2);
            lastSteps.push(
                <circle key={to.x.toString() + to.y.toString()} cx={point.cx} cy={point.cy} r={radius} stroke="#FFC400" strokeWidth="2" fill="none" />
            );
        }

        return (
            <g>
                <defs>
                    <radialGradient id="chessPiece" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                        <stop offset="0%" style={{stopColor:"#966F33",stopOpacity:0.8}} />
                        <stop offset="100%" style={{stopColor:"#663300",stopOpacity:1}} />
                    </radialGradient>
                </defs>
                {pieces}
                {lastSteps}
            </g>
        );
    }

    getCenterPoint(pos, space, rotate, adjust) {
        return {
            cx: space * (rotate ? utils.maxX - pos.x : pos.x) + space / 2 + adjust,
            cy: space * (rotate ? utils.maxY - pos.y : pos.y) + space / 2 + adjust
        };
    }
};
