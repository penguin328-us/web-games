"use strict";

const Callback = require("./callback.js");

module.exports = class Person {
    constructor(displayName, socket) {
        this.socket = socket;
        this.displayName = displayName;

        var self = this;
        this.onDisconnectCallback = new Callback();
        this.socket.on("disconnect", () => {
            self.onDisconnectCallback.invoke();
        });
    }

    emit(event, data) {
        this.socket.emit(event, data);
    }

    on(event, cb) {
        this.socket.on(event, cb);
    }

    onDisconnect(cb) {
        this.onDisconnectCallback.add(cb);
    }
};
