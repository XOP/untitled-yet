/** @jsx React.DOM */

var appContainer = document.getElementById('app');


function getData(obj){
    return Q.promise(function (resolve, reject) {
        $.getJSON("./data/" + obj + "/data.json", function(data){
            resolve(data);
        });
    });
}


/**
 * Simple icon builder
 */
var FA = React.createClass({
    render: function () {
        var className = 'fa fa-' + this.props.name;
        var attrs = $.extend({}, this.props, {className : className});
        return (
            React.createElement('span', attrs)
        );
    }
});


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
                <h4>
                    <FA name='expand' />&nbsp;{this.state.size}
                </h4>
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




var Icon = React.createClass({
    render: function() {
        return (
            <div className="icon">
                <div className="button">
                    <img src="http://lorempixel.com/24/24/cats" width={this.props.size} height={this.props.size} alt=""/>
                    <div>{this.props.title}</div>
                    <div>{this.props.size} px</div>
                </div>

            </div>
        );
    }
});

var IconList = React.createClass({
    render: function() {
        return (
            <div className="icon-list">
                {this.props.icons.map(function(d){
                    return (
                        <Icon title={d.title} size={d.size} />
                    )
                })}
            </div>
        );
    }
});

/**
 * Icon form
 *
 */
var IconLibrary = React.createClass({

    getInitialState: function() {
        return {
            icons: []
        }
    },

    componentDidMount : function(){
        getData("icons").then(function(data){
            if(this.isMounted()){
                this.setState({
                    icons: data
                })
            }
        }.bind(this));
    },

    render: function() {
        return (
            <div className='form'>
                <FilterForm minSize='10' maxSize='18' />
                <IconList icons={this.state.icons} />
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