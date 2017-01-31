"use strict";

module.exports = class Callback {
    constructor() {
        this.callback = [];
    }

    invoke(...args) {
        this.callback.forEach((cb) => {
            cb.apply(this, args);
        });
    }

    add(cb) {
        if (cb) {
            this.callback.push(cb);
        }
    }
}