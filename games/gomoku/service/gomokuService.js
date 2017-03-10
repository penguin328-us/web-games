"use strict";

const gomokuEvents = require("./gomokuEvents");
const GameServiceBase = require("../../common/game-service/gameServiceBase");
const role = require("../role");
const Gomoku = require("../gomoku");
const gameStatus = require("../../common/gameStatus");

const rolesDef = [{
    value: role.white,
    maxCount: 1
}, {
    value: role.black,
    maxCount: 1
}, {
    value: role.watcher,
    maxCount: 1000
}];

module.exports = class GomokuService extends GameServiceBase {
    constructor(room) {
        super(room, rolesDef, [role.white, role.black]);
        this.gomoku = new Gomoku();
        this.gameStatus = gameStatus.waiting;
        this.lastStep = undefined;

        const self = this;
        this.rolesReadyWaiter.onReady.add(() => {
            self.gameStatus = gameStatus.running;
            self.lastStep = undefined;
            self.gomoku.reset();
            self.setGameStarted(self.getGameState());
        });
        this.room.onEnterRoom.add((person) => {
            if (self.gameStatus === gameStatus.running) {
                self.setGameStarted(self.getGameState(), person);
            }
        });
        this.room.on(gomokuEvents.takeStep, (r, p, step) => {
            if (this.roleService.getPerson(self.gomoku.turn) === p && this.gameStatus === gameStatus.running) {
                if (self.gomoku.takeStep(step)) {
                    self.lastStep = step;
                    self.updateGameState(self.getGameState());
                }
            }
        });
        this.room.on(gomokuEvents.surrender, (r, p, data) => {
            const rl = self.roleService.getRole(p);
            if (rl === role.black) {
                self.markGameComplete(role.white);
            }
            else if (rl === role.white) {
                self.markGameComplete(role.black);
            }
        });
        this.gomoku.winCallback.add((role, row) => {
            self.markGameComplete(role, row);
        });
    }

    markGameComplete(winRole, row) {
        const person = this.roleService.getPerson(winRole);
        this.gameStatus = gameStatus.completed;
        this.rolesReadyWaiter.reset();
        this.setGameCompleted({
            wins: [{
                displayName: person ? person.displayName : undefined,
                role: winRole
            }],
            row: row
        });
    }

    getGameState() {
        return {
            board: this.gomoku.board,
            turn: this.gomoku.turn,
            lastStep: this.lastStep,
        };
    }
};
