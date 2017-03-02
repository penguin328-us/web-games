"use strict";

const React = require("react");
import TextField from 'material-ui/TextField';

// required attrs
// chatClient - ChatClient

module.exports = class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    render() {
        return (
            <div>
                <TextField floatingLabelText="Press Enter to Send Message" hintText="message to be sent" type="text" onKeyPress={this.handleKeyPress} fullWidth={true} />
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
