function SaveDB(productData,model){
	this.productData = productData;
	this.model = model;
}

SaveDB.prototype.save = function(productIndex) {
	let promise = new Promise((resolve,reject) => {
		if(productIndex < this.productData.length){
			console.log('==============saving to db: ',productIndex,this.productData.length,this.productData[productIndex].title);

			return this.model.create({
				product_id:this.productData[productIndex].id,
				product_title:this.productData[productIndex].title,
				sku:this.productData[productIndex].sku,
				metafields:this.productData[productIndex].metafields
			})

			.then(data => {
				resolve(this.save(productIndex + 1));
			})

			.catch( err => {
				console.log("===========Error saving products: ",productIndex,this.productData[productIndex].title);
				console.log(err);
				if(err.errmsg.includes("E11000")){
					resolve(this.save(productIndex + 1));
				}
				else{
					reject(err);
				}
			});
		}
		else{
			resolve('done');
		}
	});

	return promise;
};

module.exports = {SaveDB};