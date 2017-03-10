"use strict";

const gomokuEvents = require("./gomokuEvents");
const GameClientBase = require("../../common/game-service/gameClientBase");

module.exports = class GomokuClient extends GameClientBase {
    constructor(person) {
        super(person);
    }

    takeStep(pos) {
        this.person.emit(gomokuEvents.takeStep, pos);
    }

    surrender() {
        this.person.emit(gomokuEvents.surrender);
    }
};
