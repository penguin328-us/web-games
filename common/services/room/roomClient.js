"use strict";

const roomEvents = require("./roomEvents.js");
const Callback = require("../../callback.js");

module.exports = class RoomClient {
    constructor(person) {
        this.person = person;
        this.onJoinedRoomCallback = new Callback();
        this.onJoinRoomMessageCallback = new Callback();
        this.onLeaveRoomMessageCallback = new Callback();

        person.on(roomEvents.joinAck, () => {
            this.onJoinedRoomCallback.invoke();
        });
        person.on(roomEvents.joinMessage, (displayName) => {
            this.onJoinRoomMessageCallback.invoke(displayName);
        });
        person.on(roomEvents.leaveMessage, (displayName) => {
            this.onLeaveRoomMessageCallback.invoke(displayName);
        });
    }

    joinRoom(displayName, roomNumber) {
        this.person.emit(roomEvents.joinRequest, {
            displayName: displayName,
            roomNumber: roomNumber
        });
    }

    onJoinedRoom(cb) {
        this.onJoinedRoomCallback.add(cb);
    }

    onJoinRoomMessage(cb) {
        this.onJoinRoomMessageCallback.add(cb);
    }

    onLeaveRoomMessage(cb) {
        this.onLeaveRoomMessageCallback.add(cb);
    }
};
