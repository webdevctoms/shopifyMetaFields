const express = require("express");
const router = express.Router();
const {checkKey} = require("../tools/checkKey");
const {Metafield} = require('../models/metafield');
const {GetData} = require('../classes/getData');
const {SaveDB} = require('../classes/saveDB');
const {GetMetafields} = require('../classes/getMetafields');
const {SaveToShopify} = require('../classes/saveShopify');
const {URLCAD,URLUS,USERKC,USERPC,USERK,USERP} = require('../config');

//copy data from CAD site
router.get("/copy",checkKey,(req,res) =>{
	const fields = ['id','title','sku'];
	const url = URLCAD + 'products.json?limit=250&fields=id,title,variants';
	const getData = new GetData(url,USERKC,USERPC,fields);

	return getData.getData([],1)

	.then(productData => {
		console.log('================Product Data Length: ',productData.length);
		const metafieldUrl = URLCAD + 'products'
		const metafields = ['namespace','key','value','value_type','owner_id'];
		const getMeta = new GetMetafields(productData,metafieldUrl,USERKC,USERPC,metafields);

		return getMeta.getMetafields([],0)
	})

	.then(metafieldData => {
		console.log('================Metafield Data Length: ',metafieldData.length);
		const saveDB = new SaveDB(metafieldData,Metafield);

		return saveDB.save(0)
		
	})

	.then(data => {
		console.log('==================done saving: ',data);
		return res.json({
			status:200,
			data:data
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

router.get("/saveBackup",checkKey,(req,res) =>{
	const url = URLUS
	const saveShopify = new SaveToShopify([{product_id : '2063113093213'}],url,USERK,USERP);

	return saveShopify.saveData(0)

	.then(data => {
		return res.json({
			status:501,
			data:data
		});
	})

	.catch(err=>{
		console.log("Error saving to shopify: ",err);
		return res.json({
			status:501,
			data:err
		});
	});
});

module.exports = {router};