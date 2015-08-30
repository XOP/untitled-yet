/**
 * Application
 */


// preloading start
var $ = require('zepto');
var Q = require('q');
// preloading end

var IconLibrary = require('IconLibrary');
var appContainer = document.getElementById('app');

React.render(
    <IconLibrary />,
    appContainer
);