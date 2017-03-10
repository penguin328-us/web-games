"use strict";

const React = require("react");
const GomokuBoard = require("./gomokuBoard.jsx");
const Gomoku = require("./gomoku.jsx");
const Row = require("./row.jsx");
const TwoDArray = require("../../games/common/twoDArray");
const gameStatus = require("../../games/common/gameStatus");
const CallbackManager = require("../../common/callbackManager");

module.exports = class GomokuGame extends React.Component {
    constructor(props) {
        super(props);
        const client = this.props.client;
        const latestGameState = client.gomokuClient.latestState;
        this.callbackManager = new CallbackManager();
        this.state = {
            gomoku: latestGameState ? new TwoDArray(latestGameState.board.x, latestGameState.board.y, latestGameState.board.array) : undefined,
            lastStep: undefined,
            turn: latestGameState ? latestGameState.turn : undefined,
            row: undefined,
        };

        this.handleTouchTap = this.handleTouchTap.bind(this);
    }

    render() {
        this.space = Math.min(
            Math.floor(this.props.width / 15),
            Math.floor(this.props.height / 15)
        );
        if (this.space % 2 !== 0) {
            this.space--;
        }

        const leftPadding = Math.floor((this.props.width - this.space * 15) / 2);
        const topPadding = Math.floor((this.props.height - this.space * 15) / 2);

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
                <svg width={this.space*15} height={this.space*15} onClick={this.handleTouchTap} ref={(svg)=>{this.svg = svg}} style={{overflow:"hidden"}}>
                    <defs>
                        <filter id="shadow" x="-20%" y="-20%" width="200%" height="200%">
                          <feOffset result="offOut" in="SourceAlpha" dx="4" dy="4" />
                          <feGaussianBlur result="blurOut" in="offOut" stdDeviation="2" />
                          <feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
                        </filter>
                    </defs>
                    <GomokuBoard space={this.space}/>
                    <Gomoku space={this.space} gomoku={this.state.gomoku} lastStep={this.state.lastStep} />
                    <Row space={this.space} row={this.state.row} />
                </svg>
            </div>
        );
    }

    componentDidMount() {
        const handleGameUpdate = this.handleGameUpdate.bind(this);
        this.callbackManager.register(this.props.client.gomokuClient.onGameStarted, ((gameState) => {
            this.setState({
                row: undefined
            });
            this.handleGameUpdate(gameState);
        }).bind(this));
        this.callbackManager.register(this.props.client.gomokuClient.onGameStateUpdated, handleGameUpdate);
        this.callbackManager.register(this.props.client.gomokuClient.onGameCompleted, ((data) => {
            this.setState({
                row: data.row
            });
        }).bind(this));
    }

    componentWillUnmount() {
        this.callbackManager.unRegisterAll();
    }

    handleGameUpdate(gameState) {
        this.setState({
            gomoku: new TwoDArray(gameState.board.x, gameState.board.y, gameState.board.array),
            lastStep: gameState.lastStep,
            turn: gameState.turn,
        });
    }

    handleTouchTap(event) {
        let pos = undefined;
        var rect = this.svg.getBoundingClientRect();
        /*
        if (event.nativeEvent.changedTouches && event.nativeEvent.changedTouches.length > 0) {
            pos = {
                x: Math.floor((event.nativeEvent.changedTouches[0].clientX - rect.left) / this.space),
                y: Math.floor((event.nativeEvent.changedTouches[0].clientY - rect.top) / this.space)
            };
        }
        
        else */
        if (event.nativeEvent.clientX !== undefined) {
            pos = {
                x: Math.floor((event.nativeEvent.clientX - rect.left) / this.space),
                y: Math.floor((event.nativeEvent.clientY - rect.top) / this.space)
            };
        }

        if (pos && this.props.client.roleClient.currentRole === this.state.turn &&
            this.props.client.gomokuClient.currentStatus === gameStatus.running && !this.state.gomoku.get(pos.x, pos.y)) {
            this.props.client.gomokuClient.takeStep(pos);
        }
    }
};
