const chai = require('chai');
const mongoose = require('mongoose');
const expect = chai.expect;
const {app, runServer, closeServer} = require('../server');
const {GetMetafields} = require('../classes/getMetafields');
//const {comparePrices} = require('./comparePrices');
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
	});
});