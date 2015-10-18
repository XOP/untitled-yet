/**
 * Icon Library
 */

var FilterForm = require('./FilterForm');
var IconList = require('./IconList');

// get icon data
var getData = require('getData');
var iconData = getData('icons');
var cachedIconData = {};

// get config
var cfg = require('config');

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
