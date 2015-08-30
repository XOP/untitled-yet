var webpack = require('webpack');
var path = require('path');
var srcPath = path.join(__dirname, 'assets/js/app/src');

var config = {
    addVendor: function (name, path) {
        this.resolve.alias[name] = path;
        this.module.noParse.push(new RegExp(path));
    },
    entry: path.join(srcPath, 'app.jsx'),
    output: {
        path: path.join(__dirname, 'public/js/app'),
        filename: 'app.js',
        publicPath: '/public/'
    },
    resolve: {
        root: srcPath,
        extensions: ['', '.js', '.jsx'],
        modulesDirectories: ['node_modules', 'assets/js/app/src', 'assets/js/app/utils'],
        alias: {}
    },
    module: {
        noParse: [],
        loaders: [
            {test: /\.jsx$/, loaders: ["jsx-loader", "imports-loader?React=react"]}
        ],
        preLoaders: [
            {test: /zepto\.min\.js$/, loader: "script-loader"},
            {test: /q\.js$/, loader: "script-loader"}
        ]
    },

    debug: true
};

config.addVendor('zepto', 'zepto/zepto.min.js');
config.addVendor('q', 'q/q.js');
//config.addVendor('react', 'react/dist/react-with-addons.min.js');

module.exports = config;