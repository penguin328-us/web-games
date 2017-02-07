"use strict";
const side = require("./side");
const pieceType = require("./pieceType");

const maxX = 9;
const maxY = 10;

module.exports.getAvailableSteps = function(chessBoard, pos) {
    const piece = chessBoard.get(pos.x, pos.y);
    if (piece) {
        switch (piece.pieceType) {
            case pieceType.rook:
                return getRookAvailableSteps(chessBoard, pos);
            case pieceType.horse:
                return getHorseAvailableSteps(chessBoard, pos);
            default:
                return undefined;
        }
    }
};

function getRookAvailableSteps(chessBoard, pos) {

}

function getHorseAvailableSteps(chessBoard, pos) {

}
