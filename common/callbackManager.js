"use strict";

module.exports = class CallbackManager {
    constructor() {
        this.registeredCallback = [];
    }

    register(cb, func) {
        cb.add(func);
        this.registeredCallback.push({
            cb: cb,
            func: func
        });
    }

    unRegisterAll() {
        this.registeredCallback.forEach(r => r.cb.remove(r.func));
        this.registeredCallback = [];
    }
};
