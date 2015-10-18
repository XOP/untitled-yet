/**
 * Utils
 *
 */

module.exports = (function() {

    /**
     * Throw error
     * @param err
     */
    function throwError(err) {
        var error = err || 'Something went wrong';
        console.log('Sorry, Error occurred: ' + error);
    }

    /**
     * Execute fn with cb by delay
     * @param fn
     * @param cb
     * @param d
     */
    function withDelay(fn, cb, d) {
        var delay = d || 2000;
        fn();
        setTimeout(function() {
            cb();
        }, delay);
    }

    /**
     * Extend Obj
     * @param tgt
     * @returns {*|{}}
     */
    function extend(tgt) {
        var out = tgt || {};

        for (var i = 1; i < arguments.length; i++) {
            var obj = arguments[i];

            if (!obj) {
                continue;
            }

            for (var key in obj) {
                if (obj.hasOwnProperty(key)) {
                    if (typeof obj[key] === 'object') {
                        extend(out[key], obj[key]);
                    } else {
                        out[key] = obj[key];
                    }
                }
            }
        }

        return out;
    }

    return {
        'throwError': throwError,
        'withDelay': withDelay,
        'extend': extend
    };
})();
