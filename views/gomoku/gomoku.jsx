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
                    <radialGradient id="blackPiece" cx="35%" cy="45%" r="55%" fx="50%" fy="50%">
                        <stop offset="0%" style={{stopColor:"#757575",stopOpacity:1}} />
                        <stop offset="100%" style={{stopColor:"black",stopOpacity:1}} />
                    </radialGradient>
                </defs>
                <defs>
                    <radialGradient id="whitePiece" cx="35%" cy="45%" r="55%" fx="50%" fy="50%">
                        <stop offset="0%" style={{stopColor:"white",stopOpacity:1}} />
                        <stop offset="100%" style={{stopColor:"#BDBDBD",stopOpacity:1}} />
                    </radialGradient>
                </defs>
                {pieces}
                {lastSteps}
            </g>
        );
    }
};
