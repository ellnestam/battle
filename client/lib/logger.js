'use strict';

var logger = {

    fail: function(bank, order) {
	console.log("Got error: " + e.message);
    },

    success: function(bank, order, res, clientData) {
	if (res.statusCode == '200') {
	    console.log('Success');
	    var params = order.parameters;
	    if (order.parameters.user && !clientData[params.user]) {
		clientData[params.user] = {pwd: params.pwd};
	    }

	    if (order.action === 'apply') {
		logger.storeLoan(order.parameters, order.id, clientData);
	    } else if (order.action === 'open') {
		// logger.storeAccount(order.parameters, clientData);
	    } else if (order.action === 'amortize') {
		logger.amortize(order.parameters, order.id, clientData);
	    } else {
		console.log('Does not handle ' + order.action + ' yet');
	    }
	} else {
	    console.log('Error occurred');
	    console.log(res.statusCode);
	}

	console.log(clientData);


    },

    storeLoan : function(parameters, id, clientData) {
	var loans = {};
	if (clientData[parameters.user].loans) {
	    loans = clientData[parameters.user].loans;
	} 
	
	loans[id] = parameters.amount;
	clientData[parameters.user].loans = loans;
    },


    amortize : function(parameters, id, clientData) {
	// console.log(clientData[parameters.user].loans[id]);
	clientData[parameters.user].loans[id] -= parameters.amount;
    },

    storeAccount : function(parameters, clientData) {
	clientData[parameters.user] = {pwd: parameters.pwd,
				       accounts: {
					   'ACC_1' : 0
				       }
				      };
    }

};


module.exports = logger;