"use strict";

const React = require("react");
import NavigationClose from 'material-ui/svg-icons/navigation/close';

module.exports = class PopMessage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: true
        };
        this.handleTouchTap = this.handleTouchTap.bind(this);
    }

    render() {
        return (
            <div style={{
                display:this.state.show?"block":"none",
                padding:"15px 10px 10px 10px"
            }} className="popup">
                <div className="arrow"></div>
                <span onTouchTap={this.handleTouchTap} className="close"><NavigationClose /></span>
                {this.props.children}
            </div>
        );
    }

    handleTouchTap() {
        this.setState({
            show: false
        });
    }
};
