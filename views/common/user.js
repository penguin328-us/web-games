"use strict";

const storage = require("./storage");

module.exports.getDisplayName = function() {
    let displayName = loadDisplayName();
    while (!displayName) {
        displayName = prompt("Please input display name to continue...");
        saveDisplayName(displayName);
    }

    return displayName;
};

function saveDisplayName(displayName) {
    storage.save("displayName", displayName);
}

function loadDisplayName() {
    return storage.read("displayName");
}
