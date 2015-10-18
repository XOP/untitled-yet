/**
 * Simple icon builder
 */

var Utils = require('utils');

module.exports = React.createClass({
    propTypes: {
        name: React.PropTypes.string
    },

    render: function() {
        var className = 'fa fa-' + this.props.name;
        var attrs = Utils.extend({}, this.props, {className: className});
        return (
            React.createElement('span', attrs)
        );
    }
});
