/**
 * Icon list
 */

var Icon = require('Icon/Icon');

module.exports = React.createClass({
    propTypes: {
        icons: React.PropTypes.array
    },

    // demo only
    // update with corresponding icons
    shouldComponentUpdate: function(nextProps, nextState) {
        return nextProps.icons.length;
    },

    render: function() {
        return (
            <div className="icon-list">
                {this.props.icons.map(function(d, key) {
                    return (
                        <Icon key={key} title={d.title} size={d.size} />
                    );
                })}
            </div>
        );
    }
});
