"use strict";

const chatEvents = require("./chatEvents.js");

module.exports = class ChatService {
    constructor(room) {
        room.on(chatEvents.chat, (r, p, message) => {
            r.broadcast(chatEvents.chat, {
                displayName: p.displayName,
                message: message
            });
        });
    }
};
