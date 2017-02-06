"use strict";

const roleEvents = require("./roleEvents.js");
const Callback = require("../../callback.js");

module.exports = class RoleClient{
    constructor(person){
        this.person = person;
        this.currentRole = undefined;
        this.availableRoles = [];
        this.onAckRoleChangeEvents = new Callback();
        this.onRoleChangeMessageEvents = new Callback();
        var self = this;

        person.on(roleEvents.ackRoleChanged,(role)=>{
            self.currentRole = role;
            self.onAckRoleChangeEvents.invoke(role);
        });
        person.on(roleEvents.roleChangeMessage,(data)=>{
            self.availableRoles = data.availableRoles;
            self.onRoleChangeMessageEvents.invoke(data);
        });
    }

    changeRole(role){
        this.person.emit(roleEvents.changRoleRequest,role);
    }

    onAckRoleChange(cb){
        this.onAckRoleChangeEvents.add(cb);
    }

    onRoleChangeMessage(cb){
        this.onRoleChangeMessageEvents.add(cb);
    }
}