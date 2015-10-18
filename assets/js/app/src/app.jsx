/**
 * Application
 */

//
// preloading
/*eslint-disable */
var Q = require('q');
var $ = require('zepto');
/*eslint-enable  */


//
// loading
var IconLibrary = require('Library/IconLibrary');
var appContainer = document.getElementById('app');

ReactDOM.render(
    <IconLibrary />,
    appContainer
);
