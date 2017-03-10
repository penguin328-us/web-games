"use strict";

const React = require("react");
const GomokuPiece = require("./gomokuPiece.jsx");

// required attrs
// gomoku
// lastStep
// space

module.exports = class Chess extends React.Component {
    render() {
        const pieces = [];
        if (this.props.gomoku) {
            this.props.gomoku.foreach((p, x, y) => {
                pieces.push(
                    <GomokuPiece key={x.toString() + y.toString()} space={this.props.space} role={p.role} step={p.step} x={x} y={y} />
                );
            });
        }

        const lastSteps = [];
        if (this.props.lastStep) {
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
};
