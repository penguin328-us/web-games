"use strict";

const chessEvents = require("./chessEvents");
const GameServiceBase = require("../../common/game-service/gameServiceBase");
const role = require("../role");
const Chess = require("../chess");
const gameStatus = require("../../common/gameStatus");

const rolesDef = [{
    value: role.red,
    maxCount: 1
}, {
    value: role.black,
    maxCount: 1
}, {
    value: role.watcher,
    maxCount: 1000
}];

module.exports = class ChessService extends GameServiceBase {
    constructor(room) {
        super(room, rolesDef, [role.red, role.black]);
        this.chess = new Chess();
        this.gameStatus = gameStatus.waiting;
        this.lastStep = undefined;

        const self = this;
        this.rolesReadyWaiter.onReady(() => {
            self.gameStatus = gameStatus.running;
            self.lastStep = undefined;
            self.chess.reset();
            self.setGameStarted(self.getGameState());
        });
        this.room.onEnterRoom((person) => {
            if (self.gameStatus === gameStatus.running) {
                self.setGameStarted(self.getGameState(), person);
            }
        });
        this.room.on(chessEvents.takeStep, (r, p, step) => {
            if (this.roleService.getPerson(self.chess.turn) === p) {
                if (self.chess.takeStep(step.from, step.to)) {
                    self.lastStep = step;
                    self.updateGameState(self.getGameState());
                }
            }
        });
        this.room.on(chessEvents.surrend, (r, p, data) => {
            const rl = self.roleService.getRole(p);
            if (rl === role.black) {
                self.markGameComplete(role.red);
            }
            else if (rl === role.red) {
                self.markGameComplete(role.black);
            }
        });
        this.chess.onWin((role) => {
            self.markGameComplete(role);
        });
    }

    markGameComplete(winRole) {
        const person = self.roleService.getPerson(winRole);
        this.gameStatus = gameStatus.completed;
        this.rolesReadyWaiter.reset();
        this.setGameCompleted({
            displayName: person ? person.displayName : undefined,
            role: winRole
        });
    }

    getGameState() {
        return {
            board: this.chess.board,
            turn: this.chess.turn,
            lastStep: this.lastStep,
        };
    }
};
