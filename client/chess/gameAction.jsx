"use strict";

const React = require("react");
const gameStatus = require("../../games/common/gameStatus");
const role = require("../../games/chinese-chess/role");

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
                    <button onClick={this.handleSurrender} className="pure-button" style={{backgroundColor:"rgb(223, 117, 20)", color:"white"}}>Surrender</button>
                );
            }
            else {
                return (
                    <button onClick={this.handleReady} disabled={this.state.hasReady} className="pure-button pure-button-primary">Ready</button>
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
        this.props.chessClient.surrender();
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
