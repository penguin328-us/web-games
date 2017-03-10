"use strict";

const React = require("react");

// required attrs
// space - number

module.exports = class ChessBoard extends React.Component {
    render() {
        const space = this.props.space;
        const start = space / 2;
        const strokeWidth = space <= 50 ? 1 : 2;
        const stroke = "black";
        let key = 1;
        const results = [];

        // horizontal lines
        let x1 = start;
        let x2 = start + space * 14;
        for (let i = 0; i < 15; i++) {
            const y = start + i * space;
            results.push(
                <line key={key++} x1={x1} x2={x2} y1={y} y2={y} stroke={stroke} strokeWidth={strokeWidth} />
            );
        }

        // vertical lines
        let y1 = start;
        let y2 = start + space * 14;
        for (let i = 0; i < 15; i++) {
            const x = start + i * space;
            results.push(
                <line key={key++} x1={x} x2={x} y1={y1} y2={y2} stroke={stroke} strokeWidth={strokeWidth} />
            );
        }

        const r = Math.max(space / 16, 2);
        [{
            x: 3,
            y: 3
        }, {
            x: 11,
            y: 3
        }, {
            x: 7,
            y: 7
        }, {
            x: 3,
            y: 11
        }, {
            x: 11,
            y: 11
        }].forEach((p) => {
            results.push(
                <circle key={key++} cx={p.x*space+start} cy={p.y*space+start} r={r} stroke="black" strokeWidth={strokeWidth} fill={stroke} />
            );
        });

        return (
            <g>
                {results}
            </g>
        );
    }
};
