require('colors');
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Weather = require('./model/model');
var port = +process.argv[2] || 8080;
var db = 'mongodb://localhost/weather';
var app = new express();
var path = require('path');

mongoose.connect(db);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.static('../client/dist/'));

app.get('/', function(req, res) {
    res.send('Welcome');
});

app.get('/weather', function(req, res) {
    Weather.find({})
    .exec(function(err, data) {
        if(err) {
            res.send('error');
        } else {
            console.log('[GET] Getting weather details of all cities.'.blue);
            res.json(data);
        }
    });
});

app.post('/weather', function(req, res) {
    Weather.create(req.body, function(err, data) {
        if(err) {
            res.send('error');
        } else {
            console.log('[POST] Posting weather details for city.'.blue);
            res.send(data);
        }
    });
});

app.get('/weather/:id', function(req, res) {
    Weather.findOne({
        id: req.params.id
    })
    .exec(function(err, data) {
        if(err) {
            res.send('error');
        } else {
            console.log('[GET] Getting weather details of individual City.'.blue);
            res.json(data);
        }
    });
});


app.put('/weather/:id', function(req, res) {
    Weather.findOneAndUpdate({
        id: req.params.id
    }, {
        $set: req.body
    }, {
        upsert: true
    }, function(err, data) {
        if(err) {
            res.send('error');
        } else {
            console.log('[PUT] Updating weather details for city.'.blue);
            res.send('Success');
        }
    });
});

app.delete('/weather/:id', function(req, res) {
    Weather.findOneAndRemove({
        id: req.params.id
    }, function(err, data) {
        if(err) {
            res.send('error');
        } else {
            console.log('[DELETE] Deleting weather details for city.'.blue);
            res.send('Success');
        }
    });
});


app.listen(port, function () {
    console.log(('Listening on port ' + port).blue);
});
