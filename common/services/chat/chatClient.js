"use strict";

const chatEvents = require("./chatEvents.js");
const Callback = require("../../callback.js");

module.exports = class ChatClient {
    constructor(person) {
        this.person = person;
        this.onChat = new Callback();
        self = this;
        this.person.on(chatEvents.chat, (data) => {
            self.onChat.invoke(data.displayName, data.message);
        });
    }

    chat(message) {
        this.person.emit(chatEvents.chat, message);
    }

};
