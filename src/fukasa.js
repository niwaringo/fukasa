const throttle = require("./throttle");
const ukakko = require("ukakko");

class Fukasa {
    constructor() {
        this._allEvents = [];
        this._scrollFunc = this._createScrollFunc();
    }

    on(target, callback) {
        ukakko(() => {
            const event = {};
            event.target = target;
            event.targetY = this._getTargetHeight(target);
            event.callback = callback;
            this._allEvents.push(event);
            if (this._allEvents.length === 1) this._bindScroll();
        });
    }

    _getTargetHeight(target) {
        if (Object.prototype.toString.call(target) === "[object Number]") {
            const pageHeight = document.body.scrollHeight;
            const targetHeight = pageHeight * target;
            return (target !== 1) ? targetHeight : targetHeight - 5;
        }

        if (target instanceof HTMLElement) {
            return target.offsetTop;
        }

        return 0;
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
