/**
 * Simple icon builder
 */

module.exports = React.createClass({
    propTypes: {
        name: React.PropTypes.string
    },

    render: function() {
        var className = 'fa fa-' + this.props.name;
        var attrs = $.extend({}, this.props, {className: className});
        return (
            React.createElement('span', attrs)
        );
    }
});
