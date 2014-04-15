'use strict';

var q = require('q');

var logger = {

    fail: function(bank, order) {
	console.log("Got error: " + e.message);
    },

    success: function(bank, order, clientData) {
	    var params = order.parameters;

	    if (order.parameters.user && !clientData[params.user]) {
		clientData[params.user] = {pwd: params.pwd};
	    }

	    // console.log(clientData);

	    if (order.action === 'apply') {
		return logger.storeLoan(order.parameters, order.id, clientData);
	    } else if (order.action === 'open') {
		logger.storeAccount(order.parameters, order.id, clientData);
	    } else if (order.action === 'amortize') {
		logger.amortize(order.parameters, order.id, clientData);
	    } else if (order.action === 'deposit') {
		logger.deposit(order.parameters, order.id, clientData);
	    } else if (order.action === 'withdraw') {
		// logger.withdraw(order.parameters, order.id, clientData);
	    } else if (order.action === 'balance') {
		// logger.balance(order.parameters, order.id, clientData);
	    } else {
		console.log('Does not handle ' + order.action + ' yet');
	    }

    },

    storeLoan : function(parameters, id, clientData) {
	var loans = {};
	if (clientData[parameters.user].loans) {
	    loans = clientData[parameters.user].loans;
	} 
	
	loans[id] = parameters.amount;
	clientData[parameters.user].loans = loans;
	console.log('-> Storing loan');
    },


    amortize : function(parameters, id, clientData) {
	clientData[parameters.user].loans[id] -= parameters.amount;
    },

    deposit : function(parameters, id, clientData) {
	console.log('-> Depositing');
	clientData[parameters.user].accounts[id] += parameters.amount;
    },

    balance : function(parameters, id, clientData) {
	// console.log("Balance is " + clientData[parameters.user].accounts[id]);
	clientData[parameters.user].accounts[id] += parameters.amount;
    },

    withdraw : function(parameters, id, clientData) {
	clientData[parameters.user].accounts[id] -= parameters.amount;
    },


    storeAccount : function(parameters, id, clientData) {
	var accounts = {};
	console.log('Storing account');
	if (clientData[parameters.user].accounts) {
	    accounts = clientData[parameters.user].accounts;
	} 
	
	accounts[id] = 0;
	clientData[parameters.user].accounts = accounts;
    }

};


module.exports = logger;