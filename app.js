const request = require('request');

const yargs = require('yargs');

const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');

const argv = yargs
.options({
     a: {
     	demand: true,
     	alias: 'address',
     	describe: 'Address to fetch weather for',
     	string : true
     }
})
.help()
.alias('help','h')
.argv;

let toCelsius = (fahrenheit) => {
   let celsius =  ( 5 / 9 ) * ( fahrenheit - 32 );
   return celsius;
}
 geocode.geocodeAddress(argv.address,(errorMessage, results) => {
	if(errorMessage){
		console.log(errorMessage);
	} else {
		console.log(`Address: ${results.address}`);

weather.getWeather(results.longitude,results.latitude, (errorMessage, WeatherResult) => {
if(errorMessage){
	console.log(errorMessage);
}else{
	console.log(JSON.stringify(`It's currently ${toCelsius(WeatherResult.temperature)}.C It's feel like ${toCelsius(WeatherResult.apparentTemperature)}.C`));
}

});

	}
});


