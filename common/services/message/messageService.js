"use strict";

const messageEvents = require("./messageEvents.js");

module.exports = class MessageService {
    constructor(room) {
        this.room = room;
    }

    sendMessage(message){
        this.room.broadcast(messageEvents.message,message);
    }
}