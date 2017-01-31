"use strict";

const ChatClient = require("../common/services/chat/chatClient.js");
const Person = require("../common/person.js");
const RoomClient = require("../common/services/room/roomClient.js");

const socket = io("/chess").connect();
socket.on("connect",()=>{
    const person = new Person("test",socket);
    const chatClient = new ChatClient(person);
    const roomClient = new RoomClient(person);
    roomClient.onJoinedRoom(()=>{
        $("textarea").append("joined room successfully\r\n");
    });

    roomClient.onJoinRoomMessage((displayName)=>{
        $("textarea").append("welcome " + displayName + "\r\n");
    });

    roomClient.onLeaveRoomMessage((displayName)=>{
        $("textarea").append(displayName + " left room \r\n");
    });

    chatClient.onChat((displayName,message)=>{
        $("textarea").append(displayName + ":" + message + "\r\n");
    });

    $("button").click(()=>{
        const message = $("input").val();
        if(message){
            chatClient.chat(message);
        }
    });

    roomClient.joinRoom(new Date().getTime(), "12");
});