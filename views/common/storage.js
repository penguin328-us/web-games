"use strict";

/* global localStorage */

module.exports.save = function(name, content) {
    if (typeof(Storage) !== undefined) {
        if (typeof content !== "string") {
            content = JSON.stringify(content);
        }
        return localStorage.setItem(name, content);
    }
};

module.exports.read = function(name) {
    if (typeof(Storage) !== undefined) {
        const item = localStorage.getItem(name);
        if (item) {
            try {
                return JSON.parse(item);
            }
            catch (err) {
                return item;
            }
        }
    }
};
