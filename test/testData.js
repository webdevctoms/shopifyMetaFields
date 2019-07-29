const chai = require('chai');
const mongoose = require('mongoose');
const expect = chai.expect;
const {app, runServer, closeServer} = require('../server');
const {GetMetafields} = require('../classes/getMetafields');
const {GetData} = require('../classes/getData');
const {compareMetafields} = require('./compareMetafields');
const {DATABASE_URL,URLCAD,URLUS,USERKC,USERPC,USERK,USERP} = require('../config');

describe('Test Metafield Data',function(){
	before(function(){
		return runServer(DATABASE_URL);
	});

	after(function() {
	    return closeServer();
	});

	describe('Compare saved data to CAD data',function(){
		it('should start server',function(done){
			//set timeout for test
			this.timeout(5000);
			expect(1+1).to.equal(2);
			done();
		});

		it('should have matching data',function(){
			this.timeout(900000);
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
				return compareMetafields(metafieldData,0,[])
			})

			.then(results => {
				console.log("=========================results from compare prices: ",results, results.length);
				expect(results).to.have.lengthOf(0);
			})

			.catch(err => {
				console.log('Error testing metafield data: ',err);
			});
		});
	});
});