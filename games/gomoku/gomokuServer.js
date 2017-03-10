"use strict";

const ChatService = require("../../common/services/chat/chatService.js");
const RoomService = require("../../common/services/room/roomService.js");
const GomokuService = require("./service/gomokuService");

const nameSpace = "/gomoku";

module.exports.start = function(io) {
    const roomService = new RoomService(io, nameSpace);
    roomService.onRoomCreated.add((room) => {
        let chatService = new ChatService(room);
        let gomokuService = new GomokuService(room);
        room.onEmpty.add(() => {
            chatService = undefined;
            gomokuService = undefined;
        });
    });
};
