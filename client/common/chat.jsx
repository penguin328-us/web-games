"use strict";

const React = require("react");

// required attrs
// chatClient - ChatClient

module.exports = class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ""
        };
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    render() {
        return (
            <div>
                <input type="text" onKeyPress={this.handleKeyPress} />
            </div>
        );
    }

    handleKeyPress(event) {
        const text = event.target.value;
        if (text && event.key === 'Enter') {
            this.props.chatClient.chat(text);
            event.target.value = "";
        }
    }
};
