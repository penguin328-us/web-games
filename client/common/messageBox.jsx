"use strict";

const React = require("react");


module.exports = class MessageBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: []
        };
    }

    addMessage(message) {
        this.setState({
            messages: this.state.messages.concat([message])
        });
    }

    render() {
        const width = this.props.width || "98%";
        const height = this.props.height || "98%";

        return (
            <textarea style={{
                width:width,
                height:height
            }} value={this.state.messages.join("\r\n")}></textarea>
        );
    }
};
