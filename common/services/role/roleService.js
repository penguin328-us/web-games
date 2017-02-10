"use strict";

const roleEvents = require("./roleEvents.js");
const Callback = require("../../callback.js");

module.exports = class RoleService {
    /*
        rolesDef = [
            {
                value:roleValue(string),
                maxCount: number(maximum allowed roles)
            }
        ]
    */
    constructor(room, rolesDef) {
        this.room = room;
        this.roles = {};
        this.onRoleChanged = new Callback();
        const self = this;
        rolesDef.forEach((e) => {
            self.roles[e.value] = {
                people: [],
                maxCount: e.maxCount
            };
        });

        this.room.on(roleEvents.changRoleRequest, (room, person, role) => {
            if (self.roles[role] && self.roles[role].people.length < self.roles[role].maxCount) {
                self.removePerson(person);
                self.roles[role].people.push(person);
                self.onRoleChanged.invoke(person, role);
                person.emit(roleEvents.ackRoleChanged, role);
                room.broadcast(roleEvents.roleChangeMessage, {
                    displayName: person.displayName,
                    role: role,
                    availableRoles: self.getAvailableRoles()
                });
            }
        });
        this.room.onLeftRoom.add((person) => {
            self.removePerson(person);
        });
    }

    getAvailableRoles() {
        const availableRoles = [];
        const self = this;
        Object.keys(this.roles).forEach((role) => {
            if (self.roles[role].people.length < self.roles[role].maxCount) {
                availableRoles.push(role);
            }
        });
        return availableRoles;
    }

    getPerson(role) {
        return this.roles[role] && this.roles[role].people.length > 0 ? this.roles[role].people[0] : undefined;
    }

    getPeople(role) {
        return this.roles[role] ? this.roles[role].people : undefined;
    }

    removePerson(person) {
        const self = this;
        Object.keys(this.roles).forEach((role) => {
            let index = self.roles[role].people.indexOf(person);
            if (index >= 0) {
                self.roles[role].people.splice(index, 1);
            }
        });
    }
    
    getRole(person){
        const roles = Object.keys(this.roles);
        for(let i=0;i<roles.length;i++){
            if(this.roles[roles[i]].people.indexOf(person)>=0){
                return roles[i];
            }
        }
        return undefined;
    }
};
