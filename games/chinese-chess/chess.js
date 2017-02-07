"use strict";
const TwoDArray = require("../common/twoDArray");
const side = require("./side");
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
        this.turn = side.red;
        this.winCallback = new Callback();
    }

    reset() {
        this.board.fill(undefined);
        const self = this;
        piecesDef.forEach((def) => {
            def.positions.forEach((p) => {
                self.board.set(p.x, p.y, {
                    side: side.red,
                    pieceType: def.pieceType
                });
                self.board.set(p.x, 9 - p.y, {
                    side: side.black,
                    pieceType: def.pieceType
                });
            });
        });
        this.turn = side.red;
    }

    takeStep(pos1, pos2) {
        const availableSteps = utils.getAvailableSteps(this.chessBoard, pos1);
        const piece = this.chessBoard.get(pos1.x, pos1.y);
        if (utils.isPosInArray(pos2, availableSteps.runSteps)) {
            this.makeTurn(piece, pos1, pos2);
        }
        else if (utils.isPosInArray(pos2, availableSteps.eatSteps)) {
            const eated = this.chessBoard.get(pos2.x, pos2.y);
            if (eated.pieceType === pieceType.king) {
                this.winCallback.invoke(this.turn);
            }
            this.makeTurn(piece, pos1, pos2);
        }
    }

    makeTurn(piece, pos1, pos2) {
        this.chessBoard.set(pos2.x, pos2.y, piece);
        this.chessBoard.set(pos1.x, pos1.y, undefined);
        this.turn = this.turn === side.red ? side.black : side.red;
    }
    
    onWin(cb){
        this.winCallback.add(cb);
    }
};
