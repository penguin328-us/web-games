"use strict";
const role = require("./role");

const maxRow = 14;
module.exports.maxRow = maxRow;

const dirs = [{
    from: {
        x: -1,
        y: 0
    },
    to: {
        x: 1,
        y: 0
    }
}, {
    from: {
        x: 0,
        y: -1
    },
    to: {
        x: 0,
        y: 1
    }
}, {
    from: {
        x: -1,
        y: -1
    },
    to: {
        x: 1,
        y: 1
    }
}, {
    from: {
        x: -1,
        y: 1
    },
    to: {
        x: 1,
        y: -1
    }
}, ];

module.exports.getRows = function(chessBoard, pos) {
    const rows = [];
    dirs.forEach((dir) => {
        const row = [];
        const piece = chessBoard.get(pos.x, pos.y);
        if (piece) {
            row.push(pos);
            let x = pos.x + dir.from.x;
            let y = pos.y + dir.from.y;
            while (x >= 0 && y >= 0 && x <= maxRow && y <= maxRow) {
                const p = chessBoard.get(x, y);
                if (p && p.role === piece.role) {
                    row.splice(0, 0, {
                        x: x,
                        y: y
                    });
                    x = x + dir.from.x;
                    y = y + dir.from.y;
                }
                else {
                    break;
                }
            }

            x = pos.x + dir.to.x;
            y = pos.y + dir.to.y;
            while (x >= 0 && y >= 0 && x <= maxRow && y <= maxRow) {
                const p = chessBoard.get(x, y);
                if (p && p.role === piece.role) {
                    row.push({
                        x: x,
                        y: y
                    });
                    x = x + dir.to.x;
                    y = y + dir.to.y;
                }
                else {
                    break;
                }
            }
        }

        rows.push(row);
    });
    return rows;
};
