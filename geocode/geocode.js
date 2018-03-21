const request = require('request');



let geocodeAddress = (address, callback) => {

	let encodedAddress = encodeURIComponent(address);

	request({

		url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
		json: true
	}, (error, response, body) =>{
			if(error == null && body.status === 'OK'){
		       callback(undefined, {
					 	address: body.results[0].formatted_address,
					 	latitude: body.results[0].geometry.location.lat,
					 	longitude: body.results[0].geometry.location.lng,
					 	
		            });

            }
            else if(error){
			    	  callback('Unable to connect to Google server');
    	    }
	    	else{
	    		callback('Adress not available or currently access denied |__(:/)__/');
	    	}

     
        })

};
module.exports = {
	geocodeAddress
};