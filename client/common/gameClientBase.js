"use strict";

const ChatClient = require("../../common/services/chat/chatClient.js");
const Person = require("../../common/person.js");
const RoomClient = require("../../common/services/room/roomClient.js");
const user = require("./user");


module.exports = class GameClientBase {
    constructor(namespace, roomJoinedCallback) {
        /* global io */
        const socket = io(namespace).connect();
        this.roomJoined = false;
        socket.on("connect", (() => {
            this.person = new Person(user.getDisplayName(), socket);
            this.chatClient = new ChatClient(this.person);
            this.roomClient = new RoomClient(this.person);
            this.roomClient.onJoinedRoom.add((() => {
                this.roomJoined = true;
                if (roomJoinedCallback) {
                    roomJoinedCallback();
                }
            }).bind(this));
            this.roomClient.joinRoom(this.getRoomNumber());
        }).bind(this));
    }

    getRoomNumber() {
        return "12345";
    }
};
