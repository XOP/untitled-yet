/**
 * State toggler
 */

module.exports = React.createClass({
    propTypes: {
        on: React.PropTypes.bool,
        onToggle: React.PropTypes.func
    },

    getDefaultProps: function(){
        return {
            on: false
        }
    },

    render: function () {
        var className = 'toggler fa fa-toggle-' + (this.props.on ? 'on' : 'off');
        var attrs = $.extend({}, this.props, {className : className, onClick : this.props.onToggle});
        return (
            React.createElement('span', attrs)
        );
    }
});