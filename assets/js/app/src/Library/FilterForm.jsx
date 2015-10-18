/**
 * Icon name field
 */

var FA = require('FA/FA');
var Toggle = require('Toggle/Toggle');

module.exports = React.createClass({
    propTypes: {
        size: React.PropTypes.number,
        minSize: React.PropTypes.number,
        maxSize: React.PropTypes.number,
        onSize: React.PropTypes.func,
        sizeOn: React.PropTypes.bool,
        onSizeToggle: React.PropTypes.func
    },

    getInitialState: function() {
        return {
            size: this.props.minSize,
            sizeOn: this.props.sizeOn
        };
    },

    render: function() {
        return (
            <div className="row">
                <h4>
                    <div className="u-pull-left">
                        <FA name="expand" />&nbsp;{this.props.size}
                    </div>
                    <div className="u-pull-right">
                        <Toggle on={this.props.sizeOn} onToggle={this.props.onSizeToggle} />
                    </div>
                </h4>
                <input
                    value={this.props.size}
                    onChange={this.props.onSize}
                    type="range"
                    min={this.props.minSize}
                    max={this.props.maxSize}
                    step="2"
                    name="size"
                    className="u-full-width"
                    />
                <div className="u-cf u-full-width">
                    <div className="u-pull-left">
                        {this.props.minSize}
                    </div>
                    <div className="u-pull-right">
                        {this.props.maxSize}
                    </div>
                </div>
            </div>
        );
    }
});
