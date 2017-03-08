"use strict";

const React = require("react");
const gameStatus = require("../../games/common/gameStatus");
const role = require("../../games/chinese-chess/role");
import RaisedButton from 'material-ui/RaisedButton';

// required attributes
// roleClient
// chessClient


module.exports = class GameAction extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            role: this.props.roleClient.currentRole,
            status: this.props.chessClient.currentStatus,
            hasReady: false
        };
        this.handleReady = this.handleReady.bind(this);
        this.handleSurrender = this.handleSurrender.bind(this);
        this.handleRoleChange = this.handleRoleChange.bind(this);
        this.handleStatusChange = this.handleStatusChange.bind(this);
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
        this.props.roleClient.onAckRoleChange.add(this.handleRoleChange);
        this.props.chessClient.onGameStarted.add(this.handleStatusChange);
        this.props.chessClient.onGameCompleted.add(this.handleStatusChange);
    }

    componentWillUnmount() {
        this.props.roleClient.onAckRoleChange.remove(this.handleRoleChange);
        this.props.chessClient.onGameStarted.remove(this.handleStatusChange);
        this.props.chessClient.onGameCompleted.remove(this.handleStatusChange);
    }

    handleReady() {
        this.props.chessClient.ready();
        this.setState({
            hasReady: true
        });
    }

    handleSurrender() {
        if (confirm("Are you sure to surrender?")) {
            this.props.chessClient.surrender();
        }
    }

    handleStatusChange() {
        this.setState({
            status: this.props.chessClient.currentStatus,
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
