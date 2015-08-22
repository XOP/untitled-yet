/** @jsx React.DOM */

var appContainer = document.getElementById('app');


/**
 * Icon name field
 *
 */
var FilterForm = React.createClass({
    getInitialState: function() {
        return {
            size: this.props.minSize
        };
    },
    handleChange: function(event) {
        this.setState({
            size: event.target.value
        })
    },
    render: function() {
        return (
            <div className='row'>
                <label>Size | {this.state.size}</label>
                <input onChange={this.handleChange} type='range' min={this.props.minSize} max={this.props.maxSize} value={this.state.size} step='2' name='size' className='u-full-width' />
                <div className='u-cf u-full-width'>
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
 * Icon form
 *
 */
var IconLibrary = React.createClass({

    render: function() {
        return (
            <div className='form'>
                <FilterForm minSize='10' maxSize='18' />
            </div>
        );
    }
});


/**
 * Wrap things up
 */
React.render(
    <IconLibrary />,
    appContainer
);