"use strict";

const Callback = require("../../../common/callback");

module.exports = class RolesReadyWaiter {
    constructor(requiredRoles) {
        this.requiredRoles = requiredRoles || [];
        this.eventFired = false;
        this.onReadyCallback = new Callback();
        this.readys = [];
    }

    reset() {
        this.eventFired = false;
        this.readys = [];
    }

    setReady(person, role) {
        this.readys.push({
            person: person,
            role: role
        });

        if (!this.eventFired) {
            const readyRoles = this.readys.map(r => r.role);
            let allReady = true;
            for (let i = 0; i < this.requiredRoles.length; i++) {
                if (readyRoles.indexOf(this.requiredRoles[i]) < 0) {
                    allReady = false;
                    break;
                }
            }
            if (allReady) {
                this.eventFired = true;
                this.onReadyCallback.invoke();
            }
        }
    }

    resetReady(person) {
        let length = this.readys.length;
        for (let i = 0; i < length; i++) {
            if (this.readys[i].person === person) {
                this.readys.splice(i, 1);
                length--;
                i--;
            }
        }
    }

    onReady(cb) {
        this.onReadyCallback.add(cb);
    }
};
