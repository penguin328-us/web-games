"use strict";

const React = require("react");
const ChessBoard = require("./chessBoard.jsx");
const Chess = require("./chess.jsx");
const role = require("../../games/chinese-chess/role");
const pieceType = require("../../games/chinese-chess/pieceType");
const TwoDArray = require("../../games/common/twoDArray");

module.exports = class ChessGame extends React.Component {
    constructor(props) {
        super(props);
        this.space = Math.min(
            Math.floor(this.props.width / 9),
            Math.floor(this.props.height / 10)
        );
        if (this.space % 2 !== 0) {
            this.space--;
        }
        const client = this.props.client;
        const latestGameState = client.chessClient.latestState;
        this.state = {
            role: client.roleClient.currentRole,
            chess: latestGameState?new TwoDArray(latestGameState.board.x, latestGameState.board.y, latestGameState.board.array):undefined
        };

        this.handleRoleChange = this.handleRoleChange.bind(this);
        this.handleGameUpdate = this.handleGameUpdate.bind(this);
    }

    render() {
        const leftPadding = Math.floor((this.props.width - this.space * 9) / 2);
        const topPadding = Math.floor((this.props.height - this.space * 10) / 2);

        const divStyle = {
            width: this.props.width,
            height: this.props.height,
            paddingTop: topPadding,
            paddingLeft: leftPadding,
            backgroundColor: "#966F33"
        };

        return (
            <div style={divStyle}>
                <svg width={this.space*9} height={this.space*10} >
                    <ChessBoard space={this.space} />
                    <Chess space={this.space} chess={this.state.chess} rotate={this.state.role === role.black} />
                </svg>
            </div>
        );
    }

    componentDidMount() {
        this.props.client.roleClient.onAckRoleChange.add(this.handleRoleChange);
        this.props.client.chessClient.onGameStarted.add(this.handleGameUpdate);
        this.props.client.chessClient.onGameStateUpdated.add(this.handleGameUpdate);
    }

    componentWillUnmount() {
        this.props.client.roleClient.onAckRoleChange.remove(this.handleRoleChange);
        this.props.client.chessClient.onGameStarted.remove(this.handleGameUpdate);
        this.props.client.chessClient.onGameStateUpdated.remove(this.handleGameUpdate);
    }

    handleRoleChange() {
        this.setState({
            role: this.props.client.roleClient.currentRole
        });
    }

    handleGameUpdate(gameState) {
        this.setState({
            chess: new TwoDArray(gameState.board.x, gameState.board.y, gameState.board.array)
        });
    }
};
