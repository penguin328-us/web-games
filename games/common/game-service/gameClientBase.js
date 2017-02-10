"use strict";

const Callback = require("../../../common/callback");
const gameEventsBase = require("./gameEventsBase");

module.exports = class GameClientBase {
    constructor(person) {
        this.person = person;
        this.onReadyMessage = new Callback();
        this.onGameStateUpdated = new Callback();
        this.onGameStarted = new Callback();
        this.onGameCompleted = new Callback();

        const self = this;
        this.on(gameEventsBase.readyMessage, (data) => {
            self.onReadyMessageCallback.invoke(data.displayName, data.role);
        });

        this.on(gameEventsBase.stateUpdated, (state) => {
            self.onGameStateUpdatedCallback.invoke(state);
        });

        this.on(gameEventsBase.gameStarted, (data) => {
            self.onGameStartedCallback.invoke(data);
        });

        this.on(gameEventsBase.gameCompleted, (data) => {
            self.onGameCompletedCallback.invoke(data);
        });
    }

    ready() {
        this.person.emit(gameEventsBase.ready);
    }
};
