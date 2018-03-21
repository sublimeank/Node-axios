const axios = require('axios');

const yargs = require('yargs');


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
 

let encodedAddress = encodeURIComponent(argv.address);

let geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;

axios.get(geocodeUrl).then((response) => { 
  if(response.data.status === 'OK'){
      let lat = response.data.results[0].geometry.location.lat;
      let lng = response.data.results[0].geometry.location.lng;
      let weatherUrl = `https://api.darksky.net/forecast/c2438ff02e876ca790398831e22b3e0a/${lat},${lng}`;
      return axios.get(weatherUrl)
  }
 else
   throw new Error('Unable to find that address');
}).then((response) => {
    let temperature = response.data.currently.temperature;
    let apparentTemperature = response.data.currently.apparentTemperature;
    console.log(`It's Currently ${toCelsius(temperature)}.C It feels like ${toCelsius(apparentTemperature)}.C`);
} ).catch((e) => {
  if(e.code === 'ENOTFOUND'){
      console.log('Unable to connect to api server');
  }else{
    console.log('Adress not available or currently access denied |__(:/)__/');
  }

});
