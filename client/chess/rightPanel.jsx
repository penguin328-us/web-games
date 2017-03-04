"use strict";

const React = require("react");
const ReactDom = require("react-dom");
const RoleSelect = require("../common/roleSelect.jsx");
const GameAction = require("./gameAction.jsx");
const Chat = require("../common/chat.jsx");
const PopMessage = require("../common/popMessage.jsx");

const role = require("../../games/chinese-chess/role");
const CallbackManager = require("../../common/callbackManager");
const gameStatus = require("../../games/common/gameStatus");

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
        this.callbackManager = new CallbackManager();
        this.state = {
            openDrawer: this.props.client.chessClient.latestState !== gameStatus.running,
            messages: [],
            popMessages: []
        };
        this.messageKey = 1;
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
                <div style={{height:Math.max(150,height-220),border:"1px gray solid", borderRadius:"3px", padding:5, overflowX:"hidden", overflowY:"auto"}}>
                    {this.state.messages}
                    <div ref={(el)=>{this.messagesEnd = el}}></div>
                </div>
                <div style={{height:80}}>
                    <Chat chatClient={this.props.client.chatClient} />
                </div>
            </div>
        );

        const popMessage = (
            <div style={{
                display:this.state.openDrawer?"none":"block",
                position:"fixed",
                right:"0px",
                top:"65px",
                width:this.props.width,
                overflow:"hidden"
            }}>
                {this.state.popMessages}
            </div>);

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
                {popMessage}
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
            openDrawer: true,
            popMessages: []
        });
    }

    addMessage(message) {
        this.setState({
            messages: this.state.messages.concat([message])
        });

        if (this.props.hide && !this.state.openDrawer) {
            const pop = (
                <PopMessage key={this.messageKey++}>
                    {message}
                </PopMessage>
            );

            this.setState({
                popMessages: this.state.popMessages.concat([pop])
            });

            setTimeout((() => {
                const index = this.state.popMessages.indexOf(pop);
                if (index >= 0) {
                    this.setState({
                        popMessages: this.state.popMessages.filter((_, i) => i !== index)
                    });
                }
            }).bind(this), 10000);
        }
    }

    componentDidMount() {
        const success = {
            color: "#4CAF50"
        };
        const warning = {
            color: "#F57F17"
        };
        const chat = {
            color: "#757575"
        };

        this.callbackManager.register(this.props.client.roleClient.onRoleChangeMessage,
            ((data) => {
                if (data.displayName && data.role) {
                    this.addMessage(
                        <div key={this.messageKey++} style={success}>
                            <b>{data.displayName}</b> changed to role <b>{data.role}</b>
                        </div>
                    );
                }
            }).bind(this));

        this.callbackManager.register(this.props.client.roomClient.onJoinRoomMessage,
            ((displayName) => {
                this.addMessage(
                    <div key={this.messageKey++} style={success}>
                            <b>{displayName}</b> entered room
                        </div>
                );
            }).bind(this));

        this.callbackManager.register(this.props.client.roomClient.onLeaveRoomMessage,
            ((displayName) => {
                this.addMessage(
                    <div key={this.messageKey++} style={warning}>
                            <b>{displayName}</b> left room
                        </div>
                );
            }).bind(this));

        this.callbackManager.register(this.props.client.chatClient.onChat,
            ((displayName, message) => {
                this.addMessage(
                    <div key={this.messageKey++} style={chat}>
                            <b>{displayName}</b>: {message}
                        </div>
                );
            }).bind(this));

        this.callbackManager.register(this.props.client.chessClient.onReadyMessage,
            ((displayName, role) => {
                this.addMessage(
                    <div key={this.messageKey++} style={success}>
                            <b>{displayName}</b>(<b>{role}</b>) is ready
                        </div>
                );
            }).bind(this));

        this.callbackManager.register(this.props.client.chessClient.onGameStarted,
            (() => {
                if (this.props.hide) {
                    this.handleDrawerClose();
                }
                this.addMessage(
                    <div key={this.messageKey++} style={success}>
                           Game started
                    </div>
                );
            }).bind(this));

        this.callbackManager.register(this.props.client.chessClient.onGameCompleted,
            ((data) => {
                this.addMessage(
                    <div key={this.messageKey++} style={success}>
                        <b>{data.displayName}</b>(<b>{data.role}</b>) wins game
                    </div>
                );
            }).bind(this));
    }

    componentWillUnmount() {
        this.callbackManager.unRegisterAll();
    }

    componentDidUpdate() {
        this.scrollToMessageBottom();
    }

    scrollToMessageBottom() {
        const node = ReactDom.findDOMNode(this.messagesEnd);
        node.scrollIntoView({
            behavior: "smooth"
        });
    }
};
