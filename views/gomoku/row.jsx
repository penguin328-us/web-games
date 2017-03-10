"use strict";

const React = require("react");

// required attrs
// space - number
// row - position array

module.exports = class Row extends React.Component {
    render() {
        if (this.props.row && this.props.row.length > 1) {
            const space = this.props.space;
            const strokeWidth = space <= 50 ? 3 : 4;
            const stroke = "#2196F3";
            const start = this.props.row[0];
            const end = this.props.row[this.props.row.length - 1];
            const halfSpace = space / 2;

            return (
                <g>
                    <line  x1={start.x * space + halfSpace} x2={end.x * space + halfSpace} y1={start.y* space +halfSpace} y2={end.y * space + halfSpace} stroke={stroke} strokeWidth={strokeWidth} strokeDasharray="5,5" />
                </g>
            );
        }
        else {
            return null;
        }
    }
};
