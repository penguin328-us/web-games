"use strict";

const React = require("react");
const ChessGame = require("./chessGame.jsx");
const RoleSelect = require("../common/roleSelect.jsx");
const GameAction = require("./gameAction.jsx");
const role = require("../../games/chinese-chess/role");

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

module.exports = class Layout extends React.Component {
    render() {
        return (
            <table>
                <tr>
                    <td>
                        <ChessGame width="900" height="1000" client={this.props.client} />
                    </td>
                    <td>
                        <div>
                            <RoleSelect allRoles={allRoles} defaultRole={role.watcher} roleClient={this.props.client.roleClient} />
                        </div>
                        <div>
                            <GameAction roleClient={this.props.client.roleClient} chessClient={this.props.client.chessClient} />
                        </div>
                    </td>
                </tr>
            </table>
        );
    }
};
