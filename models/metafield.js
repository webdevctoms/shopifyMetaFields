const mongoose = require('mongoose');

const metafieldSchema = mongoose.Schema({
	namespace:{type:String},
	key:{type:String},
	value:{type:String},
	value_type:{type:String},
	owner_id:{type:String}
},{_id:false});

const productSchema = mongoose.Schema({
	product_id:{type:String,required:true,unique:true},
	product_title:{type:String},
	sku:{type:String},
	metafields:[metafieldSchema]
});

const Metafield = mongoose.model("Metafield",productSchema);
module.exports = {Metafield};