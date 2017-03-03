"use strict";

const React = require("react");
const RoleSelect = require("../common/roleSelect.jsx");
const GameAction = require("./gameAction.jsx");
const MessageBox = require("../common/messageBox.jsx");
const Chat = require("../common/chat.jsx");

const role = require("../../games/chinese-chess/role");

import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';
import NavigationClose from 'material-ui/svg-icons/navigation/close';

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
        this.state = {
            openDrawer: false
        };
        this.handleDrawerClose = this.handleDrawerClose.bind(this);
        this.handleDrawerOpen = this.handleDrawerOpen.bind(this);
    }

    render() {
        const height = this.props.hide ? this.props.height - 65 : this.props.height - 10;
        const children = (
            <div>
                <div style={{height:80}}>
                    <RoleSelect allRoles={allRoles} defaultRole={role.watcher} roleClient={this.props.client.roleClient} />
                </div>
                 <div style={{height:50}}>
                    <GameAction roleClient={this.props.client.roleClient} chessClient={this.props.client.chessClient} />
                </div>
                <div  style={{height:Math.max(150,height-210)}}>
                    <MessageBox ref={(mb)=>{this.messageBox = mb}} />
                </div>
                <div style={{height:80}}>
                    <Chat chatClient={this.props.client.chatClient} />
                </div>
            </div>
        );

        return this.props.hide ? (
            <div>
                <div style={{
                    display:this.state.openDrawer?"none":"block",
                    position:"fixed",
                    right:"0px",
                    top:"15px",
                    backgroundColor:"white",
                    opacity:"0.3"
                }}>
                    <IconButton onTouchTap={this.handleDrawerOpen}> <NavigationMenu /></IconButton>
                </div>
                <Drawer width={this.props.width} openSecondary={true} open={this.state.openDrawer} >
                    <AppBar title="Chess Game" iconElementLeft={<IconButton onTouchTap={this.handleDrawerClose}><NavigationClose/></IconButton>} />
                    <div style={{marginLeft:"5px", marginRight:"5px"}}>
                    {children}
                    </div>
                </Drawer>
            </div>
        ) : (
            <div style={{width:this.props.width, height:this.props.height, overflowY:"auto", overflowX:"hidden"}}>
                {children}
            </div>
        );
    }

    handleDrawerClose() {
        this.setState({
            openDrawer: false
        });
    }

    handleDrawerOpen() {
        this.setState({
            openDrawer: true
        });
    }

    componentDidMount() {
        this.roleChangeMessage = ((data) => {
            if (data.displayName && data.role) {
                this.messageBox.addMessage(`${data.displayName} changed to role ${data.role}`);
            }
        }).bind(this);
        this.props.client.roleClient.onRoleChangeMessage.add(this.roleChangeMessage);

        this.joinRoomMessage = ((displayName) => {
            this.messageBox.addMessage(`${displayName} entered room`);
        }).bind(this);
        this.props.client.roomClient.onJoinRoomMessage.add(this.joinRoomMessage);

        this.leaveRoomMessage = ((displayName) => {
            this.messageBox.addMessage(`${displayName} left room`);
        }).bind(this);
        this.props.client.roomClient.onLeaveRoomMessage.add(this.leaveRoomMessage);

        this.chatMessage = ((displayName, message) => {
            this.messageBox.addMessage(`${displayName} : ${message}`);
        }).bind(this);
        this.props.client.chatClient.onChat.add(this.chatMessage);

        this.gameReadyMessage = ((displayName, role) => {
            this.messageBox.addMessage(`${displayName}(${role}) is ready`);
        }).bind(this);
        this.props.client.chessClient.onReadyMessage.add(this.gameReadyMessage);

        this.gameStartedMessage = (() => {
            this.messageBox.addMessage("Game started");
        }).bind(this);
        this.props.client.chessClient.onGameStarted.add(this.gameStartedMessage);

        this.gameCompletedMessage = ((data) => {
            this.messageBox.addMessage(`${data.displayName}(${data.role}) wins game`);
        }).bind(this);
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
