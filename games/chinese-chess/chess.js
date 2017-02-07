"use strict";
const TwoDArray = require("../common/twoDArray");
const side = require("./side");
const pieceType = require("./pieceType");
const utils = require("./utils");

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
    }

    takeStep(pos1, pos2) {

    }
};
