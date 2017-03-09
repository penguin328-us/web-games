"use strict";

const storage = require("./storage");
const appConfig = "appConfig";

module.exports.getAppConfig = function() {
    const config = storage.read(appConfig);
    return config || {};
};

module.exports.setAppConfig = function(config) {
    storage.save(appConfig, config);
};
