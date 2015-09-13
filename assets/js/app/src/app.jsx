/**
 * Application
 */

//
// preloading
/*eslint-disable */
var $ = require('zepto');
var Q = require('q');
/*eslint-enable  */


//
// loading
var IconLibrary = require('IconLibrary');
var appContainer = document.getElementById('app');

React.render(
    <IconLibrary />,
    appContainer
);
