const request = require('request');

function SaveToShopify(productData,url,user_k,user_p){
	this.productData = productData;
	this.url = url;
	this.user_k = user_k;
	this.user_p = user_p;
}

SaveToShopify.prototype.saveData = function(productIndex) {
	var promise = new Promise((resolve,reject) => {
		let productID = this.productData[productIndex].product_id ? this.productData[productIndex].product_id:this.productData[productIndex].id;
		//let productID = 2063102705757;
		let newUrl = this.url + "products/" + productID + "/metafields.json";
		console.log(newUrl);
		const authKey = Buffer.from(this.user_k + ":" + this.user_p).toString('base64');
		const options = {
			url:newUrl,
			method:"POST",
			headers:{
				"Authorization":"Basic " + authKey
			},
			json:{
			  "metafield": {
			    "namespace": "inventory",
			    "key": "warehouse",
			    "value": 25,
			    "value_type": "integer"
			  }	
			}
		};

		//console.log(options);

		request(options,function(error,response,body){
			if(body.errors){
				console.log(body);
			}
			//console.log(body);
			//let parsedBody = JSON.parse(body);
			console.log("===============PUT data: ",productIndex);
			resolve(body);
			/*
			if(productIndex < this.productData.length - 1){
				resolve(this.saveData(productIndex + 1,conversionFactor));
			}
			else{
				console.log("final price update");
				resolve(body);
			}
			*/
			

		}.bind(this));
	});

	return promise;
};

module.exports = {SaveToShopify};