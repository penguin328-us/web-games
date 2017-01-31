(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
        $("textarea").append("joined room\r\n");
    });

    roomClient.onJoinRoomMessage((displayName)=>{
        $("textarea").append(displayName + "joined room \r\n");
    });

    roomClient.onLeaveRoomMessage((displayName)=>{
        $("textarea").append(displayName + "left room \r\n");
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
},{"../common/person.js":3,"../common/services/chat/chatClient.js":4,"../common/services/room/roomClient.js":6}],2:[function(require,module,exports){
"use strict";

module.exports = class Callback {
    constructor() {
        this.callback = [];
    }

    invoke(...args) {
        this.callback.forEach((cb) => {
            cb.apply(this, args);
        });
    }

    add(cb) {
        if (cb) {
            this.callback.push(cb);
        }
    }
}
},{}],3:[function(require,module,exports){
"use strict";

const Callback = require("./callback.js");

module.exports = class Person{
    constructor(displayName, socket){
        this.socket = socket;
        this.displayName = displayName;

        var self = this;
        this.onDisconnectCallback = new Callback();;
        this.socket.on("disconnect",()=>{
            self.onDisconnectCallback.invoke();
        });

        this.socket.on
    }

    emit(event, data){
        this.socket.emit(event, data);
    }

    on(event, cb){
        this.socket.on(event,cb);
    }

    onDisconnect(cb){
        this.onDisconnectCallback.add(cb);
    }
}
},{"./callback.js":2}],4:[function(require,module,exports){
"use strict";

const chatEvents = require("./chatEvents.js");
const Callback = require("../../callback.js");

module.exports = class ChatClient {
    constructor(person) {
        this.person = person;
        this.onChatCallback = new Callback();;
        self = this;
        this.person.on(chatEvents.chat, (data) => {
            self.onChatCallback.invoke(data.displayName,data.message);
        });
    }

    chat(message) {
        this.person.emit(chatEvents.chat, message);
    }

    onChat(callback){
        this.onChatCallback.add(callback);
    }
}
},{"../../callback.js":2,"./chatEvents.js":5}],5:[function(require,module,exports){
"use strict";

module.exports = {
    chat:"chat"
}
},{}],6:[function(require,module,exports){
"use strict";

const roomEvents = require("./roomEvents.js");
const Callback = require("../../callback.js");

module.exports = class RoomClient{
    constructor(person){
        this.person = person;
        this.onJoinedRoomCallback = new Callback();
        this.onJoinRoomMessageCallback = new Callback();
        this.onLeaveRoomMessageCallback = new Callback();

        person.on(roomEvents.joinAck,()=>{this.onJoinedRoomCallback.invoke();});
        person.on(roomEvents.joinMessage,(displayName)=>{
            this.onJoinRoomMessageCallback.invoke(displayName);
        });
        person.on(roomEvents.leaveMessage,(displayName)=>{
            this.onLeaveRoomMessageCallback.invoke(displayName);
        });
    }

    joinRoom(displayName, roomNumber){
        this.person.emit(roomEvents.joinRequest,{
            displayName:displayName,
            roomNumber:roomNumber
        });
    }

    onJoinedRoom(cb){
        this.onJoinedRoomCallback.add(cb);
    }

    onJoinRoomMessage(cb){
        this.onJoinRoomMessageCallback.add(cb);
    }

    onLeaveRoomMessage(cb){
        this.onLeaveRoomMessageCallback.add(cb);
    }
}
},{"../../callback.js":2,"./roomEvents.js":7}],7:[function(require,module,exports){
"use strict";

module.exports = {
    joinRequest: "join request",
    joinAck: "join ack",
    joinMessage: "join message",
    leaveMessage: "leave Message"
}
},{}]},{},[1]);
