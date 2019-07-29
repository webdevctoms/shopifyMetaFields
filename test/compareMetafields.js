const {Metafield} = require('../models/metafield'); 

function compareMetafields(shopifyProducts,index,results){
	let promise = new Promise((resolve,reject) => {
		resolve(shopifyProducts[index]);
	});

	return promise;
}

module.exports = {compareMetafields};