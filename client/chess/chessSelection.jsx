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
            const strokeWidth = space <= 50 ? 2 : 3;
            const eatStroke = "red";

            const steps = [];

            const margin = Math.round(space * 0.03);
            const radius = Math.round(space / 2 - margin);

            let point = undefined;

            const self = this;
            this.props.eatSteps.forEach((step) => {
                point = self.getCenterPoint(step, space, rotate, 2);
                steps.push(
                    <circle key={step.x.toString() + step.y.toString()} cx={point.cx} cy={point.cy} r={radius} stroke={eatStroke} strokeWidth={strokeWidth} fill="none" />
                );
            });

            const r = space / 4;
            this.props.runSteps.forEach((step) => {
                point = self.getCenterPoint(step, space, rotate, 0);
                steps.push(
                    <circle style={{cursor:"pointer"}} key={step.x.toString() + step.y.toString()} cx={point.cx} cy={point.cy} r={r} stroke="#2979FF" strokeWidth={strokeWidth} fill="url(#runStepGrad)" filter="url(#shadow)" />
                );
            });

            point = self.getCenterPoint(this.props.select, space, rotate, 2);
            return (
                <g>
                    <defs>
                        <radialGradient id="runStepGrad" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                          <stop offset="0%" style={{stopColor:"#3F51B5",stopOpacity:0.8}} />
                          <stop offset="100%" style={{stopColor:"#2979FF",stopOpacity:1}} />
                        </radialGradient>
                     </defs>
                    <circle key={this.props.select.x.toString() + this.props.select.y.toString()}  cx={point.cx} cy={point.cy} r={radius} stroke={stroke} strokeWidth={strokeWidth} fill="none" />
                    {steps}
                </g>
            );
        }
        else {
            return null;
        }
    }

    getCenterPoint(pos, space, rotate, adjust) {
        return {
            cx: space * (rotate ? utils.maxX - pos.x : pos.x) + space / 2 + adjust,
            cy: space * (rotate ? utils.maxY - pos.y : pos.y) + space / 2 + adjust
        };
    }
};
