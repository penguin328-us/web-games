"use strict";

const GameClientBase = require("../common/gameClientBase");
const ChessClient = require("../../games/chinese-chess/service/chessClient");
const role = require("../../games/chinese-chess/role");

const namespace = "/chess";

module.exports = class ChessGameClient extends GameClientBase {
    constructor(cb) {
        super(namespace, ((self) => {
            self.chessClient = new ChessClient(self.person);
            self.roomClient.onJoinedRoom.add(() => {
                if (self.roleClient.availableRoles.length > 1) {
                    for (let i = 0; i < self.roleClient.availableRoles.length; i++) {
                        if (self.roleClient.availableRoles[i] !== role.watcher) {
                            self.roleClient.changeRole(self.roleClient.availableRoles[i]);
                            break;
                        }
                    }
                }
                if (cb) {
                    cb(self);
                }
            });
            self.roomClient.joinRoom(self.getRoomNumber());
        }));
    }
};
