"use strict";

const Callback = require("../../../common/callback");
const gameEventsBase = require("./gameEventsBase");
const gameStatus = require("../gameStatus");


module.exports = class GameClientBase {
    constructor(person) {
        this.person = person;
        this.currentStatus = gameStatus.waiting;
        this.latestState = undefined;
        this.onReadyMessage = new Callback();
        this.onGameStateUpdated = new Callback();
        this.onGameStarted = new Callback();
        this.onGameCompleted = new Callback();

        const self = this;
        this.person.on(gameEventsBase.readyMessage, (data) => {
            self.onReadyMessage.invoke(data.displayName, data.role);
        });

        this.person.on(gameEventsBase.stateUpdated, (state) => {
            self.latestState = state;
            self.onGameStateUpdated.invoke(state);
        });

        this.person.on(gameEventsBase.gameStarted, (data) => {
            self.currentStatus = gameStatus.running;
            self.latestState = data;
            self.onGameStarted.invoke(data);
        });

        this.person.on(gameEventsBase.gameCompleted, (data) => {
            self.currentStatus = gameStatus.completed;
            self.onGameCompleted.invoke(data);
        });
    }

    ready() {
        this.person.emit(gameEventsBase.ready);
    }
};
