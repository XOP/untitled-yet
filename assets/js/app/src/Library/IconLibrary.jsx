/**
 * Icon Library
 *
 */

//
// common components
//
var FA = require('FA/FA');
var Toggle = require('Toggle/Toggle');
var Icon = require('Icon/Icon');

//
// get icon data
var getData = require('getData');
var iconData = getData('icons');
var cachedIconData = {};

//
// get config
var cfg = require('config');


/**
 * Icon name field
 *
 */
var FilterForm = React.createClass({
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


/**
 * Icon list
 *
 */
var IconList = React.createClass({
    propTypes: {
        icons: React.PropTypes.array
    },

    render: function() {
        return (
            <div className="icon-list">
                {this.props.icons.map(function(d) {
                    return (
                        <Icon title={d.title} size={d.size} />
                    );
                })}
            </div>
        );
    }
});


/**
 * Build Form
 *
 */
module.exports = React.createClass({

    getInitialState: function() {
        return {
            icons: [],

            size: cfg.minSize,
            sizeOn: cfg.isSizeOn
        };
    },

    componentDidMount: function() {
        iconData.then(function(data) {
            cachedIconData = data;

            if (this.isMounted()) {
                this.applyFilter();
            }
        }.bind(this));
    },

    //
    // pass icon data based on settings
    applyFilter: function() {
        var sortedData = cachedIconData;
        var filter = +this.state.size;
        var isSizeOn = this.state.sizeOn;

        if (isSizeOn) {
            sortedData = cachedIconData.filter(function(i) { return i.size === filter; });
        }

        this.setState({
            icons: sortedData
        });
    },

    //
    // apply current size
    sizeChange: function(event) {
        var filter = event.target.value;

        this.setState({
            size: filter
        }, this.applyFilter);
    },

    //
    // apply current state
    sizeToggle: function() {
        var isSizeOn = this.state.sizeOn ? false : true;

        this.setState({
            sizeOn: isSizeOn
        }, this.applyFilter);
    },


    render: function() {
        return (
            <div className="form">
                <FilterForm
                    minSize={cfg.minSize}
                    maxSize={cfg.maxSize}
                    size={+this.state.size}
                    sizeOn={this.state.sizeOn}
                    onSize={this.sizeChange}
                    onSizeToggle={this.sizeToggle}
                    />
                <IconList icons={this.state.icons} />
            </div>
        );
    }
});
