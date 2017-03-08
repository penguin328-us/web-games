"use strict";

const roomEvents = require("./roomEvents.js");
const Callback = require("../../callback.js");

module.exports = class RoomClient {
    constructor(person) {
        this.person = person;
        this.onJoinedRoom = new Callback();
        this.onJoinRoomMessage = new Callback();
        this.onLeaveRoomMessage = new Callback();

        person.on(roomEvents.joinAck, () => {
            this.onJoinedRoom.invoke();
        });
        person.on(roomEvents.joinMessage, (displayName) => {
            this.onJoinRoomMessage.invoke(displayName);
        });
        person.on(roomEvents.leaveMessage, (displayName) => {
            this.onLeaveRoomMessage.invoke(displayName);
        });
    }

    joinRoom(roomNumber) {
        this.person.emit(roomEvents.joinRequest, {
            displayName: this.person.displayName,
            roomNumber: roomNumber
        });
    }
};
