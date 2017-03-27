"use strict";

const React = require("react");
const PopMessage = require("./popMessage.jsx");
const QRCode = require('qrcode.react');

const appConfig = require("./appConfig");

module.exports = class GameInstruction extends React.Component {
    constructor(props) {
        super(props);
        const config = appConfig.getAppConfig();
        this.state = {
            showed: false //config.showedGameInstruction
        };
        config.showedGameInstruction = true;
        appConfig.setAppConfig(config);
    }

    render() {
        return this.state.showed ? null : (
            <div style={{
                    position:"fixed",
                    top:0,
                    left:0,
                    width:"100%",
                    paddingLeft:10,
                    paddingRight:10,
                    zIndex:10000,
                    boxSizing:"border-box"
                }}>
                    <PopMessage placement="top">
                        <div style={{
                            textAlign:"center",
                            color:"#212121",
                        }}>
                            Copy the <b>URL</b> from <b>addressbar</b> and send to your friends Or Ask your friend to scan the QR code to invite them to join the game.
                            Any Device with mordern browser should work, enjoy the game.
                            <br />
                            <QRCode value={window.location.href}/>
                        </div>
                    </PopMessage>
                </div>
        );
    }
};
