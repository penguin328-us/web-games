"use strict";

/* global localStorage */

module.exports.getDisplayName = function() {
    let displayName = loadDisplayName();
    while(!displayName){
        displayName = prompt("Please input display name to continue...");
        saveDisplayName(displayName);
    }
    
    return displayName;
};


function saveDisplayName(displayName){
    if(typeof(Storage)!== undefined){
        return localStorage.setItem("displayName", displayName);
    }
}

function loadDisplayName(){
    if(typeof(Storage)!== undefined){
        return localStorage.getItem("displayName");
    }
}