"use strict";

const ChatService = require("../../common/services/chat/chatService.js");
const RoomService = require("../../common/services/room/roomService.js");
const ChessService = require("./service/chessService");

const nameSpace = "/chess";

module.exports.start = function(io) {
    const roomService = new RoomService(io, nameSpace);
    roomService.onRoomCreate((room) => {
        let chatService = new ChatService(room);
        let chessService = new ChessService(room);
        room.onEmpty(() => {
            chatService = undefined;
            chessService = undefined;
        });
    });
};
