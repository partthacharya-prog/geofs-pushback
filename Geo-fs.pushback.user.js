// ==UserScript==
// @name         GeoFS Pushback
// @namespace    geofs.pushback
// @version      1.0
// @description  Adds pushback to GeoFS
// @match        https://www.geo-fs.com/*
// @grant        none
// ==/UserScript==


(function () {
    'use strict';

    let pushing = false;
    let speed = 0.3; // pushback speed

    document.addEventListener("keydown", e => {
        if (e.key === "P") {
            pushing = !pushing;
            console.log("Pushback:", pushing ? "ON" : "OFF");
        }
    });

    function pushback() {
        if (!geofs || !geofs.aircraft || !geofs.aircraft.instance) return;

        if (pushing && geofs.aircraft.instance.groundContact) {
            let hdg = geofs.aircraft.instance.heading * Math.PI / 180;

            geofs.aircraft.instance.position[0] -= Math.cos(hdg) * speed * 0.00001;
            geofs.aircraft.instance.position[1] -= Math.sin(hdg) * speed * 0.00001;
        }
        requestAnimationFrame(pushback);
    }

    pushback();
})();
