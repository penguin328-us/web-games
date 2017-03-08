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

    remove(cb) {
        if (cb) {
            const index = this.callback.indexOf(cb);
            if (index >= 0) {
                this.callback.splice(index, 1);
            }
        }
    }
};
