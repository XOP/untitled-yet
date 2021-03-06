/**
 * Get JSON data
 * @param obj
 * @returns {*}
 */

module.exports = function getData(obj) {
    return Q.promise(function(resolve) {
        $.getJSON('./data/' + obj + '/data.json', function(data) {
            resolve(data);
        });
    });
};
