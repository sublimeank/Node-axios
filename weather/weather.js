const request = require('request');

let getWeather = (longitude, latitude, callback) => {

	request({
		url: `https://api.darksky.net/forecast/c2438ff02e876ca790398831e22b3e0a/${latitude},${longitude}`,
		json: true
	}, (error, response, body) => {
		if(error){
          callback('Unable to connect to Forecast.io server.');
		} else if (response.statusCode === 400){
			callback('Unable to fetch weather.');
		} else if(response.statusCode === 200){
			callback(undefined,{
				temperature: body.currently.temperature,
				apparentTemperature: body.currently.apparentTemperature});
		}
	});

}

module.exports = { getWeather };