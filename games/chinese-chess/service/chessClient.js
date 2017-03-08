"use strict";

const chessEvents = require("./chessEvents");
const GameClientBase = require("../../common/game-service/gameClientBase");

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
    
    surrender(){
        this.person.emit(chessEvents.surrender);
    }
};
