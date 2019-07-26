const request = require('request');

function GetData(url,user_k,user_p,fields){
	this.url = url;
	this.user_k = user_k;
	this.user_p = user_p;
	this.fields = fields;
}
//Only capture data from first variant because if we need all variant data
//can just copy that to a variants field and then save the correct data
GetData.prototype.setFields = function(product){
	let newObject = {}
	for(let i = 0;i < this.fields.length;i++){
		//only capture data from first variant
		let field = this.fields[i];
		if(!product[field]){

			newObject[field] = product.variants[0][field];
		}
		else{
			newObject[field] = product[field];
		}
		
	}

	return newObject;
}

GetData.prototype.getData = function(dataArray,page) {
	if(dataArray === undefined){
		dataArray = [];
	}
	let promise = new Promise((resolve,reject) => {
		let newUrl = this.url;
		if(page !== undefined){
			newUrl += "&page=" + page;
		}
		const authKey = Buffer.from(this.user_k + ":" + this.user_p).toString('base64');
		//console.log(newUrl,this.user_k,this.user_p,authKey);
		const options = {
			url:newUrl,
			headers:{
				"Authorization":"Basic " + authKey
			}
		}
		console.log("===============Making request",newUrl,page);
		request(options,function(error,response,body){
			
			let parsedBody = JSON.parse(body);
			console.log("===============Got data: ",parsedBody.products.length);
			if(parsedBody.products.length !== 0){
				//possibly just push data straight into dataArray?
				for(let i = 0;i < parsedBody.products.length;i++){
					let currentProduct = parsedBody.products[i];
					let currentObject = this.setFields(currentProduct);
					//console.log(currentObject.title);
					dataArray.push(currentObject);
				}
				//let lastId = parsedBody.products[parsedBody.products.length - 1].id;
				resolve(this.getData(dataArray,page + 1));
			}
			else{
				
				resolve(dataArray);
			}

		}.bind(this));
	});

	return promise;
};

module.exports = {GetData};