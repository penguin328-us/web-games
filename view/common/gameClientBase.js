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

            if (connectedCallback) {
                connectedCallback(this);
            }
        }).bind(this));
    }

    getRoomNumber() {
        const number = this.getParameterByName("room");
        if(!number){
            window.location.href="/index.html";
        }
        return number;
    }

    getParameterByName(name, url) {
        if (!url) {
            url = window.location.href;
        }
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }
};
