"use strict";

module.exports = class Callback {
    constructor() {
        this.callback = [];
    }

    invoke() {
        this.callback.forEach((cb) => {
            cb.apply(this, arguments);
        });
    }

    add(cb) {
        if (cb) {
            this.callback.push(cb);
        }
    }
};