"use strict";

const React = require("react");
import NavigationClose from 'material-ui/svg-icons/navigation/close';

module.exports = class PopMessage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            popup: true
        };
        this.handleTouchTap = this.handleTouchTap.bind(this);
    }

    render() {

        const placement = this.props.placement || "left";
        const className = "popup " + placement;

        return this.state.popup ? (
            <div className={className}>
                <div className="arrow"></div>
                <span onTouchTap={this.handleTouchTap} className="close"><NavigationClose /></span>
                <div style={{paddingRight:20}}>
                    {this.props.children}
                </div>
            </div>
        ) : null;
    }

    handleTouchTap() {
        this.setState({
            popup: false
        });
    }
};
