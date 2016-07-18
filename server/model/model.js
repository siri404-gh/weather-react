var mongoose = require('mongoose');

var WeatherSchema = new mongoose.Schema({
    id: Number,
    dt: Number,
    cod: Number,
    name: String,
    base: String,
    wind: Object,
    main: Object,
    coord: Object,
    clouds: Object,
    sys: Object,
    weather: Array
});

module.exports = mongoose.model('Weather', WeatherSchema );
