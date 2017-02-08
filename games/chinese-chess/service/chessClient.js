"use strict";

const chessEvents = require("./chessEvents");
const GameClientBase = require("../../common/game-service/gameClientBase");
const role = require("../role");

module.exports = class ChessClient extends GameClientBase {
    constructor(person) {
        super(person);
    }

    takeStep(from, to) {
        this.person.emit(chessEvents.takeStep, {
            from: from,
            to: to
        });
    }
};
