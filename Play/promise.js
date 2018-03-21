let asyncAdd = (a,b) => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			if(typeof a === 'number' && typeof b === 'number'){
				   resolve (a+b);
			}else{
				reject('Arguments must be numbers');
			}
		},1500);
	});
}

asyncAdd(10, 10).then( (res) => {
	  console.log(res);
      return asyncAdd(Number(res), 27);
}, (errorMessage) => {
        console.log('Error: ',errorMessage);
}).then((res) => {
	console.log(res); 
	return asyncAdd(res,'27');
}).then((res) => {
	console.log(res);
}).catch((errorMessage) => {
	console.log(errorMessage);
});



// let somePromise = new Promise((resolve,reject) =>{
//                            setTimeout(()=> {
//                            	reject('unable to fulfil request!');
//                            }, 2500)     
                       
// 					});
// somePromise.then((message) => {
// 	console.log('Success' , message);
// }, (errorMessage) => {
// 	console.log('Error: ',errorMessage);
// });