"use strict";

const messageEvents = require("./messageEvents.js");
const Callback = require("../../callback.js");

module.exports = class MessageClient {
    constructor(person) {
        this.messageCallback = new Callback();
        var self = this;
        person.on(messageEvents.message,(message)=>{
            self.messageCallback.invoke(message);
        });
    }

    onMessage(cb){
        this.messageCallback.add(cb)
    }
}