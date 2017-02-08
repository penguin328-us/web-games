"use strict";

const Callback = require("../../../common/callback");
const gameEventsBase = require("./gameEventsBase");

module.exports = class GameClientBase {
    constructor(person) {
        this.person = person;
        this.onReadyMessageCallback = new Callback();
        this.onGameStateUpdatedCallback = new Callback();
        this.onGameStartedCallback = new Callback();
        this.onGameCompletedCallback = new Callback();

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
        })
    }

    ready() {
        this.person.emit(gameEventsBase.ready);
    }

    onReadyMessage(cb) {
        this.onReadyMessageCallback.add(cb);
    }

    onGameStateUpdated(cb) {
        this.onGameStateUpdatedCallback.add(cb);
    }

    onGameStarted(cb) {
        this.onGameStartedCallback.add(cb);
    }

    onGameCompleted(cb) {
        this.onGameCompletedCallback.add(cb);
    }
};
