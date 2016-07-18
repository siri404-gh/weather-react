var should = require('chai').should();
var supertest = require("supertest");
var app = require('../api');
var url = supertest("http://localhost:8080");

describe("Posting a city's weather", function(err) {
    it("Should POST Test City's weather details to /weather successfully.", function(done){
        url
            .post("/weather")
            .send('Content-Type', /json/)
            .send({
                "coord": {
                    "lon": -0.13,
                    "lat": 51.51
                },
                "weather": [
                    {
                        "id": 800,
                        "main": "Clear",
                        "description": "clear sky",
                        "icon": "01d"
                    }
                ],
                "base": "cmc stations",
                "main": {
                    "temp": 288.03,
                    "pressure": 1022,
                    "humidity": 88,
                    "temp_min": 285.15,
                    "temp_max": 291.15
                },
                "wind": {
                    "speed": 1.5
                },
                "clouds": {
                    "all": 0
                },
                "dt": 1468818804,
                "sys": {
                    "type": 1,
                    "id": 5091,
                    "message": 0.0135,
                    "country": "GB",
                    "sunrise": 1468814720,
                    "sunset": 1468872448
                },
                "id": 1,
                "name": "Test City",
                "cod": 200
            })
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function(err, res) {
                if(err) {
                    throw err;
                }
                var searchResult = JSON.parse(res.text);
                searchResult.name.should.be.equal('Test City');
                done();
            })
    });
});

describe("Updating a city's weather", function() {
    it("Should update weather details of Test City", function(done){
        url
            .put("/weather/1")
            .send('Content-Type', /json/)
            .send({
                "coord": {
                    "lon": -0.13,
                    "lat": 51.51
                },
                "weather": [
                    {
                        "id": 800,
                        "main": "Clear",
                        "description": "clear sky",
                        "icon": "01d"
                    }
                ],
                "base": "cmc stations",
                "main": {
                    "temp": 288.03,
                    "pressure": 1022,
                    "humidity": 88,
                    "temp_min": 285.15,
                    "temp_max": 291.15
                },
                "wind": {
                    "speed": 1.5
                },
                "clouds": {
                    "all": 0
                },
                "dt": 1468818804,
                "sys": {
                    "type": 1,
                    "id": 5091,
                    "message": 0.0135,
                    "country": "GB",
                    "sunrise": 1468814720,
                    "sunset": 1468872448
                },
                "id": 2,
                "name": "Test City",
                "cod": 200
            })
            .expect(200)
            .expect('Content-Type', /text\/html/)
            .end(function(err, res) {
                if(err) {
                    throw err;
                }
                res.text.should.be.equal('Success');
                done();
            })
    });
});


describe("Get weather details", function(err) {
    it("Should return an array for query for weather of all cities", function(done) {
        url
            .get("/weather")
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function(err, res) {
                if(err) {
                    throw err;
                }
                var searchResult = JSON.parse(res.text);
                searchResult.length.should.not.be.empty;
                done();
            })
    });
    it("Should get weather details of a single city", function(done) {
        url
            .get("/weather/2")
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function(err, res) {
                if(err) {
                    throw err;
                }
                var searchResult = JSON.parse(res.text);
                searchResult.id.should.be.equal(2);
                done();
            })
    });
});

describe("Deleting a city.", function(err){
    it("Should delete a city's details successfully'", function(done){
        url
            .delete("/weather/2")
            .expect(200)
            .expect('Content-Type', /text\/html/)
            .end(function(err, res) {
                if(err) {
                    throw err;
                }
                res.text.should.be.equal('Success');
                done();
            })
    });
});
