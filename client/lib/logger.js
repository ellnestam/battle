'use strict';

var logger = {

    fail: function(bank, order) {
	console.log("Got error: " + e.message);
    },

    success: function(bank, order, res, clientData) {
	if (res.statusCode == '200') {
	    console.log('Success');

	    if (order.action === 'apply') {
		logger.storeLoan(order.parameters, clientData);
		console.log(clientData);
	    } else if (order.action === 'open') {
		// logger.storeAccount(order.parameters, clientData);
	    } else if (order.action === 'amortize') {
		// logger.amortize(order.parameters, clientData);
	    } else {
		console.log('Does not handle ' + order.action + ' yet');
	    }
	} else {
	    console.log('Error occurred');
	    console.log(res.statusCode);
	}


    },

    storeLoan : function(parameters, clientData) {
	if (clientData[parameters.user]) {
	    clientData[parameters.user].pwd = parameters.pwd;
	} else {
	    clientData[parameters.user] = {pwd: parameters.pwd};
	}
	
	if (clientData[parameters.user].loans) {
	    clientData[parameters.user].loans = {'LOAN_2' : parameters.amount}
	} else {
	    clientData[parameters.user].loans = {'LOAN_1' : parameters.amount}
	}
    },


    amortize : function(parameters, clientData) {
	clientData[parameters.user] = {pwd: parameters.pwd,
				       loans: {
					   'LOAN_1' : parameters.amount
				       }
				      };
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