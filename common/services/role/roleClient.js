"use strict";

const roleEvents = require("./roleEvents.js");
const Callback = require("../../callback.js");

module.exports = class RoleClient {
    constructor(person) {
        this.person = person;
        this.currentRole = undefined;
        this.availableRoles = [];
        this.onAckRoleChange = new Callback();
        this.onRoleChangeMessage = new Callback();
        var self = this;

        person.on(roleEvents.ackRoleChanged, (role) => {
            self.currentRole = role;
            self.onAckRoleChange.invoke(role);
        });
        person.on(roleEvents.roleChangeMessage, (data) => {
            self.availableRoles = data.availableRoles;
            self.onRoleChangeMessage.invoke(data);
        });
    }

    changeRole(role) {
        this.person.emit(roleEvents.changRoleRequest, role);
    }
};
