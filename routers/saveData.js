const express = require("express");
const router = express.Router();
const {checkKey} = require("../tools/checkKey");
const {Metafield} = require('../models/metafield');
const {GetData} = require('../classes/getData');
const {URLUS,USERK,USERP} = require('../config');

//copy data from CAD site
router.get("/copy",checkKey,(req,res) =>{
	const fields = ['id','title','sku'];
	const url = URLUS + '/products.json?limit=250&fields=id,title,variants';
	const getData = new GetData(url,USERK,USERP,fields);
	return getData.getData([],1)

	.then(productData => {
		console.log('================Product Data Length: ',productData.length);
		return res.json({
			status:200,
			data:productData
		});
	})

	.catch(err=>{
		console.log("Error saving copy data: ",err);
		return res.json({
			status:501,
			data:err
		});
	});
});

module.exports = {router};