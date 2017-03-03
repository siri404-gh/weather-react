var React = require('react');
var NavBar = require('../../components/NavBar/NavBar');
var MyCities = require('../../components/MyCities/MyCities');

var Home = React.createClass({
  render: function() {
    return (
        <div>
            <NavBar/>
            <div className='container'>
                <MyCities/>
            </div>
        </div>
    );
  }
});

module.exports = Home;
