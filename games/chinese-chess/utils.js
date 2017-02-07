"use strict";
const side = require("./side");
const pieceType = require("./pieceType");

const maxX = 8;
const maxY = 9;

module.exports.getAvailableSteps = function(chessBoard, pos) {
    const piece = chessBoard.get(pos.x, pos.y);
    const runSteps = [];
    const eatSteps = [];
    if (piece) {

        switch (piece.pieceType) {

            case pieceType.rook:
                getRookAvailableSteps(chessBoard, pos, piece, runSteps, eatSteps);
                break;
            case pieceType.horse:
                getHorseAvailableSteps(chessBoard, pos, piece, runSteps, eatSteps);
                break;
            case pieceType.bishop:
                getBishopAvailableSteps(chessBoard, pos, piece, runSteps, eatSteps);
                break;
            case pieceType.guard:
                getGuardAvailableSteps(chessBoard, pos, piece, runSteps, eatSteps);
                break;
            case pieceType.king:
                getKingAvailableSteps(chessBoard, pos, piece, runSteps, eatSteps);
                break;
            case pieceType.cannon:
                getCannonAvailableSteps(chessBoard, pos, piece, runSteps, eatSteps);
                break;
            case pieceType.pawn:
                getPawnAvailableSteps(chessBoard, pos, piece, runSteps, eatSteps);
                break;
            default:
                break;
        }
    }
    return {
        runSteps: runSteps,
        eatSteps: eatSteps
    };
};

module.exports.isPosInArray = function(pos, arr) {
    for (let i = 0; i < arr.length; i++) {
        if (pos.x === arr[i].x && pos.y === arr[i].y) {
            return true;
        }
    }
    return false;
};

const lineDirs = [
        { x: -1, y: 0 },
        { x: 1, y: 0 },
        { x: 0, y: -1 },
        { x: 0, y: 1 }
    ];
    

const boardRange = {
    minX: 0,
    maxX: maxX,
    minY: 0,
    maxY: maxY
};

function isPosInBoard(pos, range) {
    if (!range) {
        range = boardRange;
    }
    return pos.x >= range.minX && pos.x <= range.maxX && pos.y >= range.minY && pos.y < range.maxY;
}

function addPosition(pos1, pos2) {
    return {
        x: pos1.x + pos2.x,
        y: pos1.y + pos2.y
    };
}

function getRookAvailableSteps(chessBoard, pos, piece, runSteps, eatSteps) {
    lineDirs.forEach((dir) => {
        var step = addPosition(pos, dir);
        while (isPosInBoard(step)) {
            const p = chessBoard.get(step.x, step.y);
            if (p) {
                if(p.side != piece.side){
                    eatSteps.push(step);
                }
                break;
            }
            else {
                runSteps.push(step);
                step = addPosition(step, dir);
            }
        }
    });
}

const horseDirs = [
        { x: -2, y: 1 },
        { x: -2, y: -1 },
        { x: 2, y: 1 },
        { x: 2, y: -1 },
        { x: 1, y: 2 },
        { x: 1, y: -2 },
        { x: -1, y: 2 },
        { x: -1, y: -2 }
    ];
    
function getHorseAvailableSteps(chessBoard, pos, piece, runSteps, eatSteps) {
    horseDirs.forEach((dir) => {
        let step = addPosition(pos, dir);
        if (isPosInBoard(step)) {
            const stopDir = {
                x: 0,
                y: 0
            };
            if (Math.abs(dir.y) > Math.abs(dir.x)) {
                stopDir.y += dir.y > 0 ? 1 : -1;
            }
            else {
                stopDir.x += dir.x > 0 ? 1 : -1;
            }
            const stop = addPosition(pos, stopDir);
            if (!chessBoard.get(stop.x, stop.y)) {
                const p = chessBoard.get(step.x, step.y);
                if (!p) {
                    runSteps.push(step);
                }
                else if (p.side != piece.side) {
                    eatSteps.push(step);
                }
            }
        }
    });
}

const bishopDirs=[
        { x: -2, y: 2 },
        { x: -2, y: -2 },
        { x: 2, y: 2 },
        { x: 2, y: -2 },
    ];

const halfRange= {
        minX: 0,
        maxX: maxX,
        minY: 0,
        maxY: 4
    };

function getBishopAvailableSteps(chessBoard, pos, piece, runSteps, eatSteps) {
    getDirSteps(chessBoard, pos, piece, runSteps, eatSteps, bishopDirs, halfRange);
}

const guardDirs=[
        { x: -1, y: -1 },
        { x: -1, y: 1 },
        { x: 1, y: -1 },
        { x: 1, y: 1 },
    ];
  
const kingRange = {
    minX: 3,
    maxX: 5,
    minY: 0,
    maxY: 2
};

function getGuardAvailableSteps(chessBoard, pos, piece, runSteps, eatSteps) {
    getDirSteps(chessBoard, pos, piece, runSteps, eatSteps, guardDirs, kingRange);
}

function getKingAvailableSteps(chessBoard, pos, piece, runSteps, eatSteps) {
    getDirSteps(chessBoard, pos, piece, runSteps, eatSteps, lineDirs, kingRange);
}

function getDirSteps(chessBoard, pos, piece, runSteps, eatSteps, dirs, range) {
    if (piece.side === side.black && range) {
        const minY = maxY - range.maxY;
        range.maxY = maxY - range.minY;
        range.minY = minY;
    }
    
    dirs.forEach((dir) => {
        const step = addPosition(pos, dir);
        if (isPosInBoard(step, range)) {
            var p = chessBoard.get(step.x, step.y);
            if (!p) {
                runSteps.push(step);
            }
            else if (p.side !== piece.side) {
                eatSteps.push(step);
            }
        }
    });
}

function getCannonAvailableSteps(chessBoard, pos, piece, runSteps, eatSteps) {
    lineDirs.forEach((dir) => {
        let eat = false;
        var step = addPosition(pos, dir);
        while (isPosInBoard(step)) {
            const p = chessBoard.get(step.x, step.y);
            if (p) {
                if (eat) {
                    if (p.side != piece.side) {
                        eatSteps.push(step);
                    }
                    break;
                }
                else {
                    eat = true;
                }
            }
            else {
                if (!eat) {
                    runSteps.push(step);
                }
                step = addPosition(step, dir);
            }
        }
    });
}

function getPawnAvailableSteps(chessBoard, pos, piece, runSteps, eatSteps) {
    const dirs = [{
        x: 0,
        y: piece.side === side.black ? -1 : 1
    }];
    if ((piece.side === side.red && pos.y > 4) ||
        (piece.side === side.black && pos.y < 5)) {
        dirs.push({
            x: -1,
            y: 0
        });
        dirs.push({
            x: 1,
            y: 0
        });
    }
    getDirSteps(chessBoard, pos, piece, runSteps, eatSteps, dirs);
}
