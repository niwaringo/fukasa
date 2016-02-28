const EventEmitter = require("events").EventEmitter;
const throttle = require("lodash/throttle");

// const all_events = Object.keys(fc._events);
// console.log(all_events);

class Fukasa extends EventEmitter {
    bindScroll() {
        window.addEventListener("scroll", throttle(() => {
            const pageyoffset = window.pageYOffset;
            console.log(pageyoffset);
        }, 500));
    }
}

module.exports = new Fukasa();
