'use strict';

var http = require('http');
var url = require('url');

var port = 7331;

var simulator = {

    run : function(bank, order, logger) {
	var formattedUrl = url.format({hostname: bank.url,
				       port: port,
				       protocol: 'http',
				       pathname: order.action,
				       search: simulator.credentials(order)
				      });

	

	http.get(formattedUrl, function(res) {
	    console.log("Got response: " + res.statusCode);
	    logger.success(bank, order);
	}).on('error', function(e) {
	    console.log("Got error: " + e.message);
	    logger.fail(bank, order);
	});
	
    },

    credentials : function(order) {
	return 'user=' + order.user + 'pwd=' + order.pwd;
    }



};

module.exports = simulator;