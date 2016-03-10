const throttle = require("lodash.throttle");
const ukakko = require("ukakko");


let allEvents = [];

function scrollFunc() {
    return throttle(() => {
        allEvents = allEvents.filter(event => {
            const distance = window.pageYOffset + window.innerHeight;
            if (distance >= event.targetY) {
                event.callback();
                return false;
            }
            return true;
        });
    }, 500);
}

function bindScroll() {
    window.addEventListener("scroll", scrollFunc());
}

function fukasa(trigger, callback) {
    ukakko(() => {
        const event = {};
        const pageHeight = document.body.scrollHeight;
        const targetHeight = pageHeight * trigger;
        event.targetY = (trigger !== 1) ? targetHeight : targetHeight - 5;
        event.callback = callback;
        allEvents.push(event);
        if (allEvents.length === 1) bindScroll();
    });

    return allEvents;
}

module.exports = fukasa;
