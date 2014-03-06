'use strict';


var logger = {

    success: function(bank, order) {
	console.log(order);
	
	if (order.action === 'apply') {
	    // Save customer info
	    console.log('New customer: ' + order.user + ' for: ' + bank.url);
	}

	
    },

    fail: function() {

    }


};


module.exports = logger;