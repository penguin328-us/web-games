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
                person.emit(roleEvents.ackRoleChanged, role);
                room.broadcast(roleEvents.roleChangeMessage, {
                    displayName: person.displayName,
                    role: role,
                    availableRoles: self.getAvailableRoles()
                });
            }
        });
        this.room.onLeftRoom((person) => {
            self.removePerson(person);
        });
    }

    getAvailableRoles() {
        const availableRoles = [];
        const self = this;
        Object.keys(this.roles).forEach((role) => {
            if (self.roles[role].people.length < self.roles[role].maxCount) {
                availableRoles.push(role)
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
}