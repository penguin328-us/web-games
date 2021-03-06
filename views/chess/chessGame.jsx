"use strict";

const React = require("react");
const ChessBoard = require("./chessBoard.jsx");
const Chess = require("./chess.jsx");
const ChessSelection = require("./chessSelection.jsx");
const role = require("../../games/chinese-chess/role");
const TwoDArray = require("../../games/common/twoDArray");
const utils = require("../../games/chinese-chess/utils");
const gameStatus = require("../../games/common/gameStatus");

module.exports = class ChessGame extends React.Component {
    constructor(props) {
        super(props);
        const client = this.props.client;
        const latestGameState = client.chessClient.latestState;
        this.state = {
            role: client.roleClient.currentRole,
            chess: latestGameState ? new TwoDArray(latestGameState.board.x, latestGameState.board.y, latestGameState.board.array) : undefined,
            lastStep: latestGameState ? latestGameState.lastStep : undefined,
            turn: latestGameState ? latestGameState.turn : undefined,
            select: undefined,
            runSteps: [],
            eatSteps: []
        };

        this.handleRoleChange = this.handleRoleChange.bind(this);
        this.handleGameUpdate = this.handleGameUpdate.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleTouchTap = this.handleTouchTap.bind(this);
    }

    render() {
        this.space = Math.min(
            Math.floor(this.props.width / 9),
            Math.floor(this.props.height / 10)
        );
        if (this.space % 2 !== 0) {
            this.space--;
        }

        const leftPadding = Math.floor((this.props.width - this.space * 9) / 2);
        const topPadding = Math.floor((this.props.height - this.space * 10) / 2);

        const divStyle = {
            width: this.props.width,
            height: this.props.height,
            paddingTop: topPadding,
            paddingLeft: leftPadding,
            backgroundColor: "#966F33",
            boxSizing: "border-box"
        };

        return (
            <div style={divStyle}>
                <svg width={this.space*9} height={this.space*10} onTouchTap={this.handleTouchTap} ref={(svg)=>{this.svg = svg}} style={{overflow:"hidden"}}>
                    <defs>
                        <filter id="shadow" x="-20%" y="-20%" width="200%" height="200%">
                          <feOffset result="offOut" in="SourceAlpha" dx="4" dy="4" />
                          <feGaussianBlur result="blurOut" in="offOut" stdDeviation="2" />
                          <feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
                        </filter>
                    </defs>
                    <ChessBoard space={this.space} />
                    <Chess space={this.space} chess={this.state.chess} rotate={this.state.role === role.black} lastStep={this.state.lastStep} />
                    <ChessSelection space={this.space} select={this.state.select} runSteps={this.state.runSteps} eatSteps={this.state.eatSteps} rotate={this.state.role === role.black} />
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
            chess: new TwoDArray(gameState.board.x, gameState.board.y, gameState.board.array),
            lastStep: gameState.lastStep,
            turn: gameState.turn,
            select: undefined,
            runSteps: [],
            eatSteps: []
        });
    }

    handleTouchTap(event) {
        let pos = undefined;
        var rect = this.svg.getBoundingClientRect();
        if (event.nativeEvent.changedTouches && event.nativeEvent.changedTouches.length > 0) {
            pos = {
                x: Math.floor((event.nativeEvent.changedTouches[0].clientX - rect.left) / this.space),
                y: Math.floor((event.nativeEvent.changedTouches[0].clientY - rect.top) / this.space)
            };
        }
        else if (event.nativeEvent.clientX !== undefined) {
            pos = {
                x: Math.floor((event.nativeEvent.clientX - rect.left) / this.space),
                y: Math.floor((event.nativeEvent.clientY - rect.top) / this.space)
            };
        }
        this.handleNewPosition(pos);
    }

    handleClick(event) {
        const pos = {
            x: Math.floor(event.nativeEvent.offsetX / this.space),
            y: Math.floor(event.nativeEvent.offsetY / this.space)
        };

        this.handleNewPosition(pos);
    }

    handleNewPosition(pos) {
        if (!pos) {
            return;
        }
        if (this.state.role === role.black) {
            pos.x = utils.maxX - pos.x;
            pos.y = utils.maxY - pos.y;
        }

        if (this.state.select) {
            if (this.state.role === this.state.turn &&
                this.state.chess.get(this.state.select.x, this.state.select.y).role === this.state.role &&
                this.props.client.chessClient.currentStatus === gameStatus.running) {
                if (utils.isPosInArray(pos, this.state.runSteps) || utils.isPosInArray(pos, this.state.eatSteps)) {
                    this.props.client.chessClient.takeStep(this.state.select, pos);
                }
                else {
                    this.setSelect(pos);
                }
            }
            else {
                this.setSelect(pos);
            }
        }
        else {
            this.setSelect(pos);
        }
    }

    setSelect(pos) {
        if (this.state.chess && this.state.chess.get(pos.x, pos.y)) {
            const steps = utils.getAvailableSteps(this.state.chess, pos);
            this.setState({
                select: pos,
                runSteps: steps.runSteps,
                eatSteps: steps.eatSteps
            });
        }
        else {
            this.setState({
                select: undefined,
                runSteps: [],
                eatSteps: [],
            });
        }
    }
};
