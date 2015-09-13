/**
 * Application
 */


//
// preloading
var $ = require('zepto');
var Q = require('q');


//
// loading
var IconLibrary = require('IconLibrary');
var appContainer = document.getElementById('app');

React.render(
    <IconLibrary />,
    appContainer
);
