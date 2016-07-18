var React = require('react');
var City = require('../City/City');

var MyCities = React.createClass({
    getInitialState: function() {
        return {
            cities: []
        }
    },
    componentWillMount: function() {
        var newCities = [];
        $.get('http://localhost:8080/weather')
        .done(function(cities) {
            if(cities) {
                cities.forEach(function(city) {
                    var id = city.id;
                    var name = city.name;
                    var country = city.sys.country;
                    var temp = city.main.temp;
                    var temp_min = city.main.temp_min;
                    var temp_max = city.main.temp_max;
                    var windDeg = city.wind.deg;
                    var windSpeed = city.wind.speed;
                    var cloudiness = city.weather[0].description;
                    var pressure = city.main.pressure;
                    var humidity = city.main.humidity;
                    var sunrise = city.sys.sunrise;
                    var sunset = city.sys.sunset;
                    var lat = city.coord.lat;
                    var long = city.coord.lon;

                    newCities.push(<City
                        name={name}
                        country = {country}
                        temp = {temp}
                        temp_min = {temp_min}
                        temp_max = {temp_max}
                        windDeg = {windDeg}
                        windSpeed = {windSpeed}
                        cloudiness = {cloudiness}
                        pressure = {pressure}
                        humidity = {humidity}
                        sunrise = {sunrise}
                        sunset = {sunset}
                        lat = {lat}
                        long = {long}
                        id = {id}/>);
                });
                this.setState({
                    cities: newCities
                });
            }
        }.bind(this));
    },
    render: function() {
        return (
            <div>
                {
                    this.state.cities.map(function(city, i) {
                        return (
                            <div key={i} className='my-table'>
                                {city}
                            </div>
                        );
                    })
                }
            </div>
        );
    }
})

module.exports = MyCities;
