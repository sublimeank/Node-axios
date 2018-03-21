
const request = require('request');

let geocodeAddress = (address) => {
     return new Promise((resolve, reject) => {
     	        let encodedAddress = encodeURIComponent(address);

	request({

		url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
		json: true
	}, (error, response, body) =>{
			if(error == null && body.status === 'OK'){
		       resolve({
					 	address: body.results[0].formatted_address,
					 	latitude: body.results[0].geometry.location.lat,
					 	longitude: body.results[0].geometry.location.lng,
					 	
		            });

            }
            else if(error){
			    	  reject('Unable to connect to Google server');
    	    }
	    	else{
	    		reject('Adress not available or currently access denied |__(:/)__/');
	    	}

     
        })


     })
};

geocodeAddress('000000').then((location) => {
	console.log(JSON.stringify(location,undefined,2));
}).catch((errorMessage) => {
	console.log(errorMessage);
});