"use strict";

const chatEvents = require("./chatEvents.js");
const Callback = require("../../callback.js");

module.exports = class ChatClient {
    constructor(person) {
        this.person = person;
        this.onChatCallback = new Callback();
        self = this;
        this.person.on(chatEvents.chat, (data) => {
            self.onChatCallback.invoke(data.displayName, data.message);
        });
    }

    chat(message) {
        this.person.emit(chatEvents.chat, message);
    }

    onChat(callback) {
        this.onChatCallback.add(callback);
    }
};
