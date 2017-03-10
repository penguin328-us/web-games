"use strict";

const React = require("react");
const gameStatus = require("../../games/common/gameStatus");
const CallbackManager = require("../../common/callbackManager");
const role = require("../../games/gomoku/role");
import RaisedButton from 'material-ui/RaisedButton';

// required attributes
// roleClient
// gomokuClient


module.exports = class GameAction extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            role: this.props.roleClient.currentRole,
            status: this.props.gomokuClient.currentStatus,
            hasReady: false
        };
        this.callbackManager = new CallbackManager();
        this.handleReady = this.handleReady.bind(this);
        this.handleSurrender = this.handleSurrender.bind(this);
    }

    render() {
        if (this.state.role && this.state.role !== role.watcher) {
            if (this.state.status === gameStatus.running) {
                return (
                    <RaisedButton onTouchTap={this.handleSurrender} label="Surrender" secondary={true} fullWidth={true} />
                );
            }
            else {
                return (
                    <RaisedButton onTouchTap={this.handleReady} label="Ready" primary={true} disabled={this.state.hasReady} fullWidth={true}/>
                );

            }
        }
        else {
            return null;
        }
    }

    componentDidMount() {
        this.callbackManager.register(this.props.roleClient.onAckRoleChange,this.handleRoleChange.bind(this));
        this.callbackManager.register(this.props.gomokuClient.onGameStarted,this.handleStatusChange.bind(this));
        this.callbackManager.register(this.props.gomokuClient.onGameCompleted,this.handleStatusChange.bind(this));
    }

    componentWillUnmount() {
        this.callbackManager.unRegisterAll();
    }

    handleReady() {
        this.props.gomokuClient.ready();
        this.setState({
            hasReady: true
        });
    }

    handleSurrender() {
        if (confirm("Are you sure to surrender?")) {
            this.props.gomokuClient.surrender();
        }
    }

    handleStatusChange() {
        this.setState({
            status: this.props.gomokuClient.currentStatus,
            hasReady: false
        });
    }

    handleRoleChange() {
        this.setState({
            role: this.props.roleClient.currentRole,
            hasReady: false
        });
    }
};
