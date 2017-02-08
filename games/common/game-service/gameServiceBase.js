"use strict";

const RolesReadyWaiter = require("./rolesReadyWaiter");
const RoleService = require("../../../common/services/role/roleService");
const gameEventsBase = require("./gameEventsBase");

module.exports = class GameServiceBase {
    constructor(room, rolesDef, requiredRoles) {
        this.room = room;
        this.roleService = new RoleService(room, rolesDef);
        this.rolesReadyWaiter = new RolesReadyWaiter(requiredRoles);

        const self = this;
        this.roleService.onRoleChanged((person, role) => {
            self.rolesReadyWaiter.resetReady(person);
        });
        this.room.onLeftRoom((person) => {
            self.rolesReadyWaiter.resetReady(person);
        });

        this.room.on(gameEventsBase.ready, (r, p, d) => {
            const role = self.roleService.getRole(p);
            if (role) {
                self.room.broadcast(gameEventsBase.readyMessage, {
                    displayName: p.displayName,
                    role: role
                });
                self.rolesReadyWaiter.setReady(p, role);
            }
        });
    }

    updateGameState(state, person) {
        if (person) {
            person.emit(gameEventsBase.stateUpdated, state);
        }
        else {
            this.room.broadcast(gameEventsBase.stateUpdated, state);
        }
    }

    setGameStarted(data, person) {
        if (person) {
            person.emit(gameEventsBase.gameStarted, data);
        }
        else {
            this.room.broadcast(gameEventsBase.gameStarted, data);
        }
    }

    setGameCompleted(data) {
        this.room.broadcast(gameEventsBase.gameCompleted, data);
    }
};
