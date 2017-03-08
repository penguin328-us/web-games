"use strict";

const Callback = require("./callback.js");

module.exports = class Room {
    constructor() {
        this.personList = [];
        this.events = {};
        this.onEmpty = new Callback();
        this.onEnterRoom = new Callback();
        this.onLeftRoom = new Callback();
    }

    addPerson(person) {
        this.personList.push(person);
        var self = this;
        person.onDisconnect.add(() => {
            self.removePerson(person);
        });
        Object.keys(this.events).forEach((event) => {
            person.on(event, (data) => {
                if (self.events[event]) {
                    self.events[event](self, person, data);
                }
            });
        });
        this.onEnterRoom.invoke(person);
    }

    removePerson(person) {
        const index = this.personList.indexOf(person);
        if (index >= 0) {
            this.personList.splice(index, 1);
            if (this.personList.length === 0) {
                this.onEmpty.invoke();
            }
        }
        this.onLeftRoom.invoke(person);
    }

    broadcast(event, data) {
        this.personList.forEach(p => p.emit(event, data));
    }

    on(event, cb) {
        this.events[event] = cb;
        var self = this;
        this.personList.forEach((p) => {
            p.on(event, (data) => {
                if (cb) {
                    cb(self, p, data);
                }
            });
        });
    }
};
