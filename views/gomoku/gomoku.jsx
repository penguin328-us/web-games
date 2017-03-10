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
        const space = this.props.space;
        if (this.props.gomoku) {
            this.props.gomoku.foreach((p, x, y) => {
                pieces.push(
                    <GomokuPiece key={x.toString() + y.toString()} space={space} role={p.role} step={p.step} x={x} y={y} />
                );
            });
        }

        const lastStep = [];
        if (this.props.lastStep) {
            let key = 1;
            const strokeWidth = space < 50 ? 2 : 3;
            const stroke = "#FFC400";
            const length = space / 3;
            const halfSpace = space / 2;
            const x = this.props.lastStep.x * space + halfSpace;
            const y = this.props.lastStep.y * space + halfSpace;
            [{
                x: -1,
                y: -1
            }, {
                x: 1,
                y: -1
            }, {
                x: -1,
                y: 1
            }, {
                x: 1,
                y: 1
            }].forEach((dir) => {
                const cx = x + halfSpace * dir.x - dir.x * strokeWidth;
                const cy = y + halfSpace * dir.y - dir.y * strokeWidth;
                lastStep.push(
                    <path key={key++} d={`M ${cx - length * dir.x} ${cy} L ${cx} ${cy} L ${cx} ${cy - length * dir.y}`} stroke={stroke} strokeWidth={strokeWidth} fill="none"/>
                );
            });
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
                {lastStep}
            </g>
        );
    }
};
