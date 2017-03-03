var React = require('react');
var Router = require('react-router');
var ReactDOM = require('react-dom');
var routes = require('./routes.js');

Router.run(routes, Router.HistoryLocation, function(Root){
    ReactDOM.render(<Root/>, document.getElementById('app-container'));
});
