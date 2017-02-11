"use strict";
const TwoDArray = require("../common/twoDArray");
const role = require("./role");
const pieceType = require("./pieceType");
const utils = require("./utils");
const Callback = require("../../common/callback");

const piecesDef = [
    {
        pieceType: pieceType.rook,
        positions: [
            { x: 0, y: 0 }, 
            { x: 8, y: 0 }]
    },
    {
        pieceType: pieceType.horse,
        positions: [
            { x: 1, y: 0 }, 
            { x: 7, y: 0 }] 
    },
    {
        pieceType: pieceType.bishop,
        positions: [
            { x: 2, y: 0 }, 
            { x: 6, y: 0 }]
    },
    {
        pieceType: pieceType.guard,
        positions: [
            { x: 3, y: 0 }, 
            { x: 5, y: 0 }]
    },
    {
        pieceType: pieceType.king,
        positions: [
            { x: 4, y: 0 }]
    },
    {
        pieceType: pieceType.cannon,
        positions: [
            { x: 1, y: 2 }, 
            { x: 7, y: 2 }]
    },
    {
        pieceType: pieceType.pawn,
        positions: [
            { x: 0, y: 3 }, 
            { x: 2, y: 3 }, 
            { x: 4, y: 3 }, 
            { x: 6, y: 3 }, 
            { x: 8, y: 3 }]
    },
];

module.exports = class Chess {
    constructor() {
        this.board = new TwoDArray(9, 10);
        this.turn = role.red;
        this.winCallback = new Callback();
    }

    reset() {
        this.board.fill(undefined);
        const self = this;
        piecesDef.forEach((def) => {
            def.positions.forEach((p) => {
                self.board.set(p.x, p.y, {
                    role: role.black,
                    pieceType: def.pieceType
                });
                self.board.set(p.x, 9 - p.y, {
                    role: role.red,
                    pieceType: def.pieceType
                });
            });
        });
        this.turn = role.red;
    }

    takeStep(from, to) {
        const availableSteps = utils.getAvailableSteps(this.board, from);
        const piece = this.board.get(from.x, from.y);
        if (piece.role === this.turn) {
            if (utils.isPosInArray(to, availableSteps.runSteps)) {
                this.makeTurn(piece, from, to);
                return true;
            }
            else if (utils.isPosInArray(to, availableSteps.eatSteps)) {
                const eated = this.board.get(to.x, to.y);
                if (eated.pieceType === pieceType.king) {
                    this.winCallback.invoke(this.turn);
                }
                this.makeTurn(piece, from, to);
                return true;
            }
        }
        return false;
    }

    makeTurn(piece, from, to) {
        this.board.set(to.x, to.y, piece);
        this.board.set(from.x, from.y, undefined);
        this.turn = this.turn === role.red ? role.black : role.red;
    }
    
    onWin(cb){
        this.winCallback.add(cb);
    }
};
