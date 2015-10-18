/**
 * State toggler
 */

var Utils = require('utils');

module.exports = React.createClass({
    propTypes: {
        on: React.PropTypes.bool,
        onToggle: React.PropTypes.func
    },

    getDefaultProps: function() {
        return {
            on: false
        };
    },

    render: function() {
        var className = 'toggler fa fa-toggle-' + (this.props.on ? 'on' : 'off');
        var attrs = Utils.extend({}, this.props, {className: className, onClick: this.props.onToggle});
        return (
            React.createElement('span', attrs)
        );
    }
});
