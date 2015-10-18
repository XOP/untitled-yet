/**
 * Icon component
 */

var cfg = require('config');

module.exports = React.createClass({
    propTypes: {
        title: React.PropTypes.string,
        size: React.PropTypes.number,
        key: React.PropTypes.string
    },

    getInitialState: function() {
        return {
            source: 'http://lorempixel.com/' + cfg.imgSize + '/' + cfg.imgSize + '/cats'
        };
    },

    render: function() {
        return (
            <div className="icon" key={this.props.key}>
                <div className="button">
                    <img src={this.state.source} width={this.props.size} height={this.props.size} alt=""/>
                    <div>{this.props.title}</div>
                    <div>{this.props.size} px</div>
                </div>

            </div>
        );
    }
});
