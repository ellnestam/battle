'use strict';


var logger = {

    success: function(bank, order) {
	console.log("Got response: " + res.statusCode);
	
	
	if (order.action === 'apply') {
	    // Save customer info
	    console.log('New customer: ' + order.parameters.user + ' for: ' + bank.url);
	}

	
    },

    fail: function(bank, order) {
	console.log("Got error: " + e.message);
    }


};


module.exports = logger;