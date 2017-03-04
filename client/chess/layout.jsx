"use strict";

const React = require("react");
const ChessGame = require("./chessGame.jsx");
const RightPanel = require("./rightPanel.jsx");


module.exports = class Layout extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.getSizeState();
        this.resizeHandler = this.resizeHandler.bind(this);
    }

    render() {
        return (
            <table style={{borderSpacing:"0px"}}>
                <tbody>
                <tr>
                    <td style={{padding:"0px"}}>
                        <ChessGame width={this.state.gameWidth} height={this.state.gameHeight} client={this.props.client} />
                    </td>
                    <td style={{width:this.state.margin, padding:"0px"}} />
                    <td style={{padding:"0px"}}>
                        <RightPanel  client={this.props.client} width={this.state.panelWdith} height={this.state.panelHeight} hide={this.state.panelHidden} />
                    </td>
                </tr>
                </tbody>
            </table>
        );
    }

    getSizeState() {
        const scale = window.screen.width / window.innerWidth;
        const clientWidth = window.innerWidth * scale;
        const clientHeight = window.innerHeight * scale;
        if (window.screen.width > 800) {
            const gameWidth = Math.min(Math.round(clientHeight / 10 * 9), clientWidth - 200);
            const margin = Math.max(10*scale,10);
            return {
                gameWidth: gameWidth,
                gameHeight: clientHeight,
                panelWdith: Math.min(clientWidth - gameWidth - margin, gameWidth - 100),
                panelHeight: clientHeight,
                panelHidden: false,
                margin: margin
            };
        }
        else {
            return {
                gameWidth: clientWidth,
                gameHeight: clientHeight,
                panelWdith: Math.min(clientWidth, 400),
                panelHeight: clientHeight,
                panelHidden: true,
                margin: 0
            };
        }
    }

    resizeHandler() {
        this.setState(this.getSizeState());
    }

    componentDidMount() {
        window.addEventListener("resize", this.resizeHandler);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.resizeHandler);
    }
};
