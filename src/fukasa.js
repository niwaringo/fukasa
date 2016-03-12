const throttle = require("lodash.throttle");
const ukakko = require("ukakko");

class Fukasa {
    constructor() {
        this._allEvents = [];
        this._scrollFunc = this._createScrollFunc();
    }

    on(trigger, callback) {
        ukakko(() => {
            const event = {};
            const pageHeight = document.body.scrollHeight;
            const targetHeight = pageHeight * trigger;
            event.targetY = (trigger !== 1) ? targetHeight : targetHeight - 5;
            event.callback = callback;
            this._allEvents.push(event);
            if (this._allEvents.length === 1) this._bindScroll();
        });
    }

    _bindScroll() {
        window.addEventListener("scroll", this._scrollFunc);
    }

    _createScrollFunc() {
        return throttle(() => {
            this._allEvents = this._allEvents.filter(event => {
                const distance = window.pageYOffset + window.innerHeight;
                if (distance >= event.targetY) {
                    event.callback();
                    return false;
                }
                return true;
            });

            if (this._allEvents.length === 0) {
                window.removeEventListener("scroll", this._scrollFunc);
            }
        }, 500);
    }
}

const fukasa = new Fukasa();
module.exports = fukasa;
