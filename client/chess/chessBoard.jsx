"use strict";

const React = require("react");

module.exports = class ChessBoard extends React.Component {
    render() {
        const space = this.props.space;
        const start = space / 2;
        const results = [];
        const strokeWidth = space <= 50 ? 1 : 2;
        const stroke = "black";

        // horizontal lines
        let x1 = start;
        let x2 = start + space * 8;
        for (let i = 0; i < 10; i++) {
            const y = start + i * space;
            results.push(
                <line x1={x1} x2={x2} y1={y} y2={y} stroke={stroke} strokeWidth={strokeWidth} />
            );
        }

        // vertical lines
        let y1 = start;
        let y2 = start + space * 4;
        let y3 = y2 + space;
        let y4 = y3 + space * 4;
        results.push(
            <line x1={start} x2={start} y1={y1} y2={y4} stroke={stroke} strokeWidth={strokeWidth} />
        );
        for (let i = 1; i < 8; i++) {
            const x = start + i * space;
            results.push(
                <line x1={x} x2={x} y1={y1} y2={y2} stroke={stroke} strokeWidth={strokeWidth} />
            );
            results.push(
                <line x1={x} x2={x} y1={y3} y2={y4} stroke={stroke} strokeWidth={strokeWidth} />
            );
        }
        results.push(
            <line x1={start + space*8} x2={start + space*8} y1={y1} y2={y4} stroke={stroke} strokeWidth={strokeWidth} />
        );

        // X lines
        x1 = start + space * 3;
        x2 = x1 + space * 2;
        y1 = start;
        y2 = y1 + space * 2;
        [0, space * 7].forEach((v) => {
            results.push(
                <line x1={x1} x2={x2} y1={y1 + v} y2={y2+v} stroke={stroke} strokeWidth={strokeWidth} />
            );
            results.push(
                <line x1={x2} x2={x1} y1={y1 + v} y2={y2+v} stroke={stroke} strokeWidth={strokeWidth} />
            );
        });

        // draw positions
        const margin = Math.max(2, Math.round(space / 20));
        const length = Math.round(space / 10);
        const lineWidth = Math.max(1, strokeWidth - 1);
        const xEnd = start + space * 8;
        [{
            x: 1,
            y: 2
        }, {
            x: 7,
            y: 2
        }, {
            x: 1,
            y: 7
        }, {
            x: 7,
            y: 7
        }, {
            x: 0,
            y: 3
        }, {
            x: 2,
            y: 3
        }, {
            x: 4,
            y: 3
        }, {
            x: 6,
            y: 3
        }, {
            x: 8,
            y: 3
        }, {
            x: 0,
            y: 6
        }, {
            x: 2,
            y: 6
        }, {
            x: 4,
            y: 6
        }, {
            x: 6,
            y: 6
        }, {
            x: 8,
            y: 6
        }].forEach((p) => {
            const x = p.x * space + start;
            const y = p.y * space + start;

            [{
                x: -1,
                y: -1
            }, {
                x: -1,
                y: 1
            }, {
                x: 1,
                y: -1
            }, {
                x: 1,
                y: 1
            }].forEach((dir) => {
                let x2 = x + dir.x * margin;
                let y2 = y + dir.y * margin;
                if (x2 > start && x2 < xEnd) {
                    const d = `M ${x2+dir.x * length} ${y2} L ${x2} ${y2} L ${x2} ${y2 + dir.y*length}`;
                    results.push(
                        <path d={d} stroke={stroke} strokeWidth={lineWidth} fill="none" />
                    );
                }
            });
        });

        // write text
        const textStyle = {
            fontSize: space / 2,
            fontFamily: "dfkai-sb"
        };
        x1 = start + space * 1.3;
        y1 = start + space * 4 + start;
        results.push(
            <text x={x1} y={y1} stroke={stroke} style={textStyle} textAnchor="start" alignmentBaseline="middle">楚</text>
        );

        x1 += space;
        results.push(
            <text x={x1} y={y1} stroke={stroke} style={textStyle} textAnchor="start" alignmentBaseline="middle">河</text>
        );

        x1 += (space * 3);
        results.push(
            <text x={x1} y={y1} stroke={stroke} style={textStyle} textAnchor="start" alignmentBaseline="middle">漢</text>
        );
        x1 += space;
        results.push(
            <text x={x1} y={y1} stroke={stroke} style={textStyle} textAnchor="start" alignmentBaseline="middle">界</text>
        );

        return (
            <g>
                {results}
            </g>
        );
    }
};
