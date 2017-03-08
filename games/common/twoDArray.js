"use strict";

module.exports = class TwoDArray {
    constructor(x, y, array) {
        this.x = x;
        this.y = y;
        if (array) {
            this.array = array;
        }
        else {
            this.array = new Array(x);
            for (let i = 0; i < y; i++) {
                this.array[i] = new Array(x);
                this.array[i].fill(undefined);
            }
        }
    }

    get(x, y) {
        return this.array[y][x];
    }

    set(x, y, elem) {
        this.array[y][x] = elem;
    }

    foreach(cb) {
        if (cb) {
            for (let y = 0; y < this.array.length; y++) {
                for (let x = 0; x < this.array[y].length; x++) {
                    if (this.array[y][x]) {
                        cb(this.array[y][x], x, y);
                    }
                }
            }
        }
    }

    fill(v) {
        for (let y = 0; y < this.array.length; y++) {
            this.array[y].fill(v);
        }
    }
};
