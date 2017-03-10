"use strict";
const TwoDArray = require("../common/twoDArray");
const role = require("./role");
const utils = require("./utils");
const Callback = require("../../common/callback");

module.exports = class Gomoku {
    constructor() {
        this.board = new TwoDArray(15, 15);
        this.turn = role.black;
        this.step = 1;
        this.winCallback = new Callback();
    }

    reset() {
        this.board.fill(undefined);
        this.turn = role.black;
        this.step = 1;
    }

    takeStep(pos) {
        if (!this.board.get(pos.x, pos.y)) {
            this.board.set(pos.x, pos.y, {
                role: this.turn,
                step: this.step++
            });
            const rows = utils.getRows(this.board, pos);
            for (let i = 0; i < rows.length; i++) {
                if (rows[i].length >= 5) {
                    this.winCallback.invoke(this.turn, rows[i]);
                    break;
                }
            }

            this.turn = this.turn === role.black ? role.white : role.black;
        }
    }
};
