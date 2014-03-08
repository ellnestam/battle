'use strict';


var logger = {

    success: function(bank, order) {
	
	if (order.action === 'apply') {
	    // Save customer info
	    console.log('New customer: ' + order.parameters.user + ' for: ' + bank.url);
	}

	
    },

    fail: function() {

    }


};


module.exports = logger;