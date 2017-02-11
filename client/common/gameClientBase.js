"use strict";

const Person = require("../../common/person.js");
const ChatClient = require("../../common/services/chat/chatClient.js");
const RoomClient = require("../../common/services/room/roomClient.js");
const RoleClient = require("../../common/services/role/roleClient.js");
const user = require("./user");


module.exports = class GameClientBase {
    constructor(namespace, connectedCallback) {
        /* global io */
        const socket = io(namespace).connect();
        socket.on("connect", (() => {
            this.person = new Person(user.getDisplayName(), socket);
            this.chatClient = new ChatClient(this.person);
            this.roleClient = new RoleClient(this.person);
            this.roomClient = new RoomClient(this.person);

            if(connectedCallback){
                connectedCallback(this);
            }
        }).bind(this));
    }

    getRoomNumber() {
        return "12345";
    }
};
