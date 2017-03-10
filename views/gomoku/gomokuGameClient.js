"use strict";

const GameClientBase = require("../common/gameClientBase");
const GomokuClient = require("../../games/gomoku/service/gomokuClient");
const role = require("../../games/gomoku/role");

const namespace = "/gomoku";

module.exports = class GomokuGameClient extends GameClientBase {
    constructor(cb) {
        super(namespace, ((self) => {
            self.gomokuClient = new GomokuClient(self.person);
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
