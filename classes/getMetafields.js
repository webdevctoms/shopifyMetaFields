const {GetData} = require('./getData');

function GetMetafields(productData,url,user_k,user_p,fields){
	this.productData = productData;
	this.url = url;
	this.dataCapture = new GetData(url,user_k,user_p,fields);
}

GetMetafields.prototype.buildUrl = function(productId){
	return this.url + '/' + productId + '/metafields.json?limit=250';
}

GetMetafields.prototype.getMetafields = function(results,productIndex) {
	let promise = new Promise((resolve,reject) => {
		if(productIndex < this.productData.length){
			results.push(this.productData[productIndex]);
			//need this to use this class for testing
			let productId = this.productData[productIndex].id ? this.productData[productIndex].id : this.productData[productIndex].product_id;
			let newUrl = this.buildUrl(productId);
			console.log('=============get metafields index: ',productIndex,this.productData.length);
			return this.dataCapture.getData([],1,newUrl)

			.then(metafields => {
				results[productIndex].metafields = metafields;
				resolve(this.getMetafields(results,productIndex + 1));
			})

			.catch(err => {
				console.log('Error capturing metafields',err);
				reject(err);
			})
		}
		else{
			resolve(results);
		}
		
	});

	return promise;
};

module.exports = {GetMetafields};