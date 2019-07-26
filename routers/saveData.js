const express = require("express");
const router = express.Router();
const {checkKey} = require("../tools/checkKey");
const {Metafield} = require('../models/metafield.js');

//copy data from CAD site
router.get("/copy",checkKey,(req,res) =>{

	return Metafield.create({
		product_id:'123',
		product_title:'test',
		sku:'123-test',
		metafields:[
			{
				namespace:'name',
				key:'the key',
				value:"[{\"sku\":\"90004-6.30\",\"quantity\":\"2\",\"locked\":\"false\"}]",
				value_type:"json_string",
				owner_id:'123'
			},
			{
				namespace:'name2',
				key:'the key 2',
				value:"some data",
				value_type:"string",
				owner_id:'123'
			}
		]
	})

	.then(message => {
		return res.json({
			status:200,
			data:message
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