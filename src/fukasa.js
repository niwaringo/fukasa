const throttle = require("lodash/throttle");
const ukakko = require("ukakko");


class Fukasa {
    constructor() {
        this._allEvents = [];
        this.pageHeight = document.body.scrollHeight;
    }

    /**
     * addEvent
     * @param trigger {number}
     * @param callback {function}
     */
    addEvent(trigger, callback) {
        ukakko(() => {
            let targetY = this.pageHeight * trigger;
            targetY = (trigger !== 1) ? targetY : targetY - 5;

            window.addEventListener("scroll", throttle(() => {
                const distance = window.pageYOffset + window.innerHeight;
                if (distance > targetY) {
                    callback.call(this);
                }
            }, 500));
        });
    }
}

module.exports = new Fukasa();
