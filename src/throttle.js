// via underscore.js(http://underscorejs.org/);
function throttle(callback, wait) {
    let result;
    let timeout = null;
    let previous = 0;

    const later = () => {
        previous = new Date();
        timeout = null;
        result = callback.apply(this);
    };

    return () => {
        const now = new Date();
        if (!previous) previous = now;
        const remaining = wait - (now - previous);
        if (remaining <= 0 || remaining > wait) {
            if (timeout) {
                clearTimeout(timeout);
                timeout = null;
            }
            previous = now;
            result = callback.apply(this);
        } else if (!timeout) {
            timeout = setTimeout(later, remaining);
        }
        return result;
    };
}

module.exports = throttle;
