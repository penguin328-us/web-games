"use strict";

const React = require("react");
const RoleSelect = require("../common/roleSelect.jsx");
const GameAction = require("./gameAction.jsx");
const MessageBox = require("../common/messageBox.jsx");
const Chat = require("../common/chat.jsx");

const role = require("../../games/chinese-chess/role");

// required attrs
// client - ChessGameClient
// width - width of right panel
// height - height of panel
// hide - boolean

const allRoles = [{
    displayName: "Red",
    value: role.red
}, {
    displayName: "Black",
    value: role.black
}, {
    displayName: "Watcher",
    value: role.watcher
}];

module.exports = class RightPanel extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return this.props.hide ? null : (
            <div style={{width:this.props.width, height:this.props.height, overflowY:"auto", overflowX:"hidden"}}>
                <div style={{height:40}}>
                    <RoleSelect allRoles={allRoles} defaultRole={role.watcher} roleClient={this.props.client.roleClient} />
                </div>
                 <div  style={{height:40}}>
                    <GameAction roleClient={this.props.client.roleClient} chessClient={this.props.client.chessClient} />
                </div>
                <div  style={{height:Math.max(400,this.props.height-130)}}>
                    <MessageBox ref={(mb)=>{this.messageBox = mb}} />
                </div>
                <div style={{height:40}}>
                    <Chat chatClient={this.props.client.chatClient} />
                </div>
            </div>
        );
    }

    componentDidMount() {
        const messageBox = this.messageBox;
        this.roleChangeMessage = (data) => {
            if (data.displayName && data.role) {
                messageBox.addMessage(`${data.displayName} changed to role ${data.role}`);
            }
        };
        this.props.client.roleClient.onRoleChangeMessage.add(this.roleChangeMessage);

        this.joinRoomMessage = (displayName) => {
            messageBox.addMessage(`${displayName} entered room`);
        };
        this.props.client.roomClient.onJoinRoomMessage.add(this.joinRoomMessage);

        this.leaveRoomMessage = (displayName) => {
            messageBox.addMessage(`${displayName} left room`);
        };
        this.props.client.roomClient.onLeaveRoomMessage.add(this.leaveRoomMessage);

        this.chatMessage = (displayName, message) => {
            messageBox.addMessage(`${displayName} : ${message}`);
        };
        this.props.client.chatClient.onChat.add(this.chatMessage);

        this.gameReadyMessage = (displayName, role) => {
            messageBox.addMessage(`${displayName}(${role}) is ready`);
        };
        this.props.client.chessClient.onReadyMessage.add(this.gameReadyMessage);

        this.gameStartedMessage = () => {
            messageBox.addMessage("Game started");
        };
        this.props.client.chessClient.onGameStarted.add(this.gameStartedMessage);

        this.gameCompletedMessage = (data) => {
            messageBox.addMessage(`${data.displayName}(${data.role}) wins game`);
        };
        this.props.client.chessClient.onGameCompleted.add(this.gameCompletedMessage);
    }

    componentWillUnmount() {
        this.props.client.roleClient.onRoleChangeMessage.remove(this.roleChangeMessage);
        this.props.client.roomClient.onJoinRoomMessage.remove(this.joinRoomMessage);
        this.props.client.roomClient.onLeaveRoomMessage.remove(this.leaveRoomMessage);
        this.props.client.chatClient.onChat.remove(this.chatMessage);
        this.props.client.chessClient.onReadyMessage.remove(this.gameReadyMessage);
        this.props.client.chessClient.onGameStarted.remove(this.gameStartedMessage);
        this.props.client.chessClient.onGameCompleted.remove(this.gameCompletedMessage);
    }
};
