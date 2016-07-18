var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;

var Master = require('./pages/Master/Master');
var Home = require('./pages/Home/Home');
var Weather = require('./pages/Weather/Weather');

module.exports = (
    <Route>
        <Route handler={Master}>
            <DefaultRoute handler={Home} name="Home"/>
        </Route>
        <Route handler={Home} name="HomePage" path="/home"/>
        <Route handler={Weather} name="Weather" path="/weather/*"/>
    </Route>
);
