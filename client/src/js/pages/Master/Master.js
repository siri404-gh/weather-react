var React = require('react');
var Router = require('react-router');

var RouteHandler = Router.RouteHandler;

var Master = React.createClass({
  render: function() {
    return (
        <div>
            <RouteHandler/>
        </div>
    );
  }
});

module.exports = Master;
