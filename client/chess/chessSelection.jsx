"use strict";

const React = require("react");
const utils = require("../../games/chinese-chess/utils");

// required attrs
// space - number
// select - point
// runSteps - point[]
// eatSteps - point[]
// rotate - default - false

module.exports = class ChessSelection extends React.Component {
    render() {
        if (this.props.select) {
            const space = this.props.space;
            const rotate = this.props.rotate ? true : false;

            const stroke = "blue";
            const strokeWidth = space <= 50 ? 1 : 2;

            const steps = [];

            const margin = Math.round(space * 0.03);
            const radius = Math.round(space / 2 - margin);

            let point = undefined;

            const self = this;
            this.props.eatSteps.forEach((step) => {
                point = self.getCenterPoint(step, space, rotate);
                steps.push(
                    <circle key={step.x.toString() + step.y.toString()} cx={point.cx} cy={point.cy} r={radius} stroke={stroke} strokeWidth={strokeWidth} fill="none" />
                );
            });

            const r = space / 4;
            this.props.runSteps.forEach((step) => {
                point = self.getCenterPoint(step, space, rotate);
                steps.push(
                    <circle key={step.x.toString() + step.y.toString()} cx={point.cx} cy={point.cy} r={r} stroke={stroke} strokeWidth={strokeWidth} fill="stroke" />
                );
            });

            point = self.getCenterPoint(this.props.select, space, rotate);
            return (
                <g>
                    <circle key={this.props.select.x.toString() + this.props.select.y.toString()}  cx={point.cx} cy={point.cy} r={radius} stroke={stroke} strokeWidth={strokeWidth} fill="none" />
                    {steps}
                </g>
            );
        }
        else {
            return null;
        }
    }

    getCenterPoint(pos, space, rotate) {
        return {
            cx: space * (rotate ? utils.maxX - pos.x : pos.x) + space / 2,
            cy: space * (rotate ? utils.maxY - pos.y : pos.y) + space / 2
        };
    }
};
