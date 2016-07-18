var React = require('react');
var Link = require('react-router').Link;

var City = React.createClass({
    render: function() {
        return (
            <div className='row'>
                <div className='col-xs-3'><Link to={"/weather/"+this.props.id}>{this.props.name}</Link></div>
                <div className='col-xs-9'>{Math.round(this.props.temp) - 273} &deg;C, temperature from {Math.round(this.props.temp_min) - 273} &deg;C to {Math.round(this.props.temp_max) - 273} &deg;C, wind {this.props.windSpeed}m/s <span className='cloudiness'>{this.props.cloudiness}</span></div>
            </div>
        )
    }
});

module.exports = City;
