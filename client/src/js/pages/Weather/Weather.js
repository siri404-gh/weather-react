var React = require('react');
var NavBar = require('../../components/NavBar/NavBar');

var Weather = React.createClass({
    getInitialState: function() {
        return {
            name: '',
            windDeg: '',
            windSpeed: '',
            cloudiness: '',
            pressure: '',
            humidity: '',
            sunrise: '',
            sunset: '',
            coords: ''
        }
    },
    componentWillMount: function() {
        var id = this.props.params.splat;
        var self = this;
        var windDeg = '',
            name='',
            temp='',
            windSpeed= '',
            cloudiness= '',
            pressure= '',
            humidity= '',
            sunrise= '',
            sunset= '',
            coords= '';
        $.get('http://localhost:8080/weather/'+id)
        .done(function(data) {
            console.log(data);
            self.setState({
                id: data.id,
                name: data.name,
                temp: data.main.temp,
                windDeg: data.wind.deg,
                windSpeed: data.wind.speed,
                cloudiness: data.weather[0].description,
                pressure: data.main.pressure,
                humidity: data.main.humidity,
                sunrise: data.sys.sunrise,
                sunset: data.sys.sunset,
                coords: '['+data.coord.lat+', '+data.coord.lon+']'
            });
        });
    },
    direction: function(val) {
        if(val >= 0 && val <45) {
            return 'North-NorthEast';
        } else if (val >=45 && val < 90) {
            return 'NothEast-East';
        } else if (val >=90 && val < 135) {
            return 'East-SouthEast';
        } else if (val >=135 && val < 180) {
            return 'SouthEast-South';
        } else if (val >= 180 && val < 225) {
            return 'South-SouthWest';
        } else if (val >= 225 && val < 270) {
            return 'SouthWest-West';
        } else if (val >= 270 && val < 315) {
            return 'West-NothWest';
        } else if (val >= 315 && val <= 360) {
            return 'NorthWest-North';
        }
        return '';
    },
    convertTime: function(time) {
        var date = new Date(time*1000);
        return date.toString();
    },
    update: function() {
        var apiKey='ef3fd3b25d4e7b4d40b7785ba9653139';
        var id = this.state.id;
        var self = this;
        var url = 'http://api.openweathermap.org/data/2.5/weather?q='+this.state.name+'&appid='+apiKey;
        $.get(url)
        .done(function(data) {
            self.setState({
                id: data.id,
                name: data.name,
                temp: data.main.temp,
                windDeg: data.wind.deg,
                windSpeed: data.wind.speed,
                cloudiness: data.weather[0].description,
                pressure: data.main.pressure,
                humidity: data.main.humidity,
                sunrise: data.sys.sunrise,
                sunset: data.sys.sunset,
                coords: '['+data.coord.lat+', '+data.coord.lon+']'
            });
            $.ajax({
                type: 'PUT',
                url: 'http://localhost:8080/weather/'+id,
                data: data,
                success: function(data) {
                    console.log(data);
                }
            });

        });
    },
    render: function() {
        return (
            <div>
                <NavBar/>
                <div className='my-table container data_container pull-left'>
                    <div className='row'>
                        <div className='col-xs-6'>
                            <h4>{this.state.name} ({Math.round(this.state.temp)-273} &deg;C)</h4>
                        </div>
                        <div className='col-xs-6'>
                            <button onClick={this.update} className='btn btn-sm pull-right btn-info'>Update</button>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-xs-4'>
                            <b>Wind</b>
                        </div>
                        <div className='col-xs-8'>
                            Gentle Breeze at {this.state.windSpeed} m/s {this.direction(this.state.windDeg)} ({this.state.windDeg})
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-xs-4'>
                            <b>Cloudiness</b>
                        </div>
                        <div className='col-xs-8 cloudiness'>
                            {this.state.cloudiness}
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-xs-4'>
                            <b>Pressure</b>
                        </div>
                        <div className='col-xs-8'>
                            {this.state.pressure} hpa
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-xs-4'>
                            <b>Humidity</b>
                        </div>
                        <div className='col-xs-8'>
                            {this.state.humidity} %
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-xs-4'>
                            <b>Sunrise</b>
                        </div>
                        <div className='col-xs-8'>
                            {this.convertTime(this.state.sunrise)}
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-xs-4'>
                            <b>Sunset</b>
                        </div>
                        <div className='col-xs-8'>
                            {this.convertTime(this.state.sunset)}
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-xs-4'>
                            <b>Geo Coords</b>
                        </div>
                        <div className='col-xs-8'>
                            {this.state.coords}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = Weather;
