"use strict";

const React = require("react");
const GomokuGame = require("./gomokuGame.jsx");
//const RightPanel = require("./rightPanel.jsx");


module.exports = class Layout extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.getSizeState();
        this.resizeHandler = this.resizeHandler.bind(this);
    }

    render() {
        return (
            <table>
                <tbody>
                <tr>
                    <td>
                        <GomokuGame width={this.state.gameWidth} height={this.state.gameHeight} client={this.props.client} />
                    </td>
                    <td style={{width:this.state.margin}} />
                    <td>
                       
                    </td>
                </tr>
                </tbody>
            </table>
        );
    }

    getSizeState() {
        const clientWidth = window.innerWidth;
        let clientHeight = window.innerHeight;
        if (clientWidth > 800) {
            clientHeight -= 3;
            const gameWidth = Math.min(clientHeight, clientWidth - 200);
            const margin = 10;
            return {
                gameWidth: gameWidth,
                gameHeight: clientHeight,
                panelWdith: clientWidth - gameWidth - margin * 2,
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
        if (window.innerWidth > 800 || !this.state.panelHidden) {
            this.setState(this.getSizeState());
        }
    }

    componentDidMount() {
        window.addEventListener("resize", this.resizeHandler);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.resizeHandler);
    }
};
