import FukasaCore from "./fukasacore";

const fc = new FukasaCore;

const fukasa = {
    on(event, listener) {
        fc.on(event, listener);
    },

    listen() {
        // const all_events = Object.keys(fc._events);
        // console.log(all_events);

        window.addEventListener("scroll", () => {
            const pageyoffset = window.pageYOffset;
            console.log(pageyoffset);
        });
    }
};

module.exports = fukasa;
