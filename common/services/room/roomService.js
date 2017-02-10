"use strict";

const roomEvents = require("./roomEvents.js");
const Room = require("../../room.js");
const Callback = require("../../callback.js");
const Person = require("../../person.js");

module.exports = class RoomService {
    constructor(io, namespace) {
        this.rooms = {};
        this.onRoomCreated = new Callback();
        var self = this;
        io.of(namespace).on("connection", (socket) => {
            socket.on(roomEvents.joinRequest, (data) => {
                if (data.displayName && data.roomNumber) {
                    const person = new Person(data.displayName, socket);
                    self.joinRoom(person, data.roomNumber);
                }
            });
        });
    }

    joinRoom(person, roomNumber) {
        let room = this.rooms[roomNumber];
        if (!room) {
            room = this.createRoom(roomNumber);
        }
        room.addPerson(person);
        person.emit(roomEvents.joinAck);
    }

    createRoom(roomNumber) {
        const room = new Room();
        this.rooms[roomNumber] = room;
        console.log("room created " + roomNumber);
        room.onEnterRoom.add((person) => {
            room.broadcast(roomEvents.joinMessage, person.displayName);
        });
        room.onLeftRoom.add((person) => {
            room.broadcast(roomEvents.leaveMessage, person.displayName);
        });
        room.onEmpty.add(() => {
            delete this.rooms[roomNumber];
            console.log("room deleted " + roomNumber);
        });
        this.onRoomCreated.invoke(room);
        return room;
    }
};
