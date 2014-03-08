'use strict';

var http = require('http');
var url = require('url');
var _ = require('lodash');

var port = 7331;

var simulator = {

    run : function(bank, order, logger) {
	var formattedUrl = url.format({hostname: bank.url,
				       port: port,
				       protocol: 'http',
				       pathname:  order.type + '/' + order.action,
				       search: simulator.credentials(order)
				      });

	console.log("URL: " + formattedUrl);

	http.get(formattedUrl, function(res) {
	    console.log("Got response: " + res.statusCode);
	    logger.success(bank, order);
	}).on('error', function(e) {
	    console.log("Got error: " + e.message);
	    logger.fail(bank, order);
	});
	
    },

    credentials : function(order) {
	var res = _.map(order.parameters, function(val, key) {return key + "=" + val});
	return res.join("&");
    }
};

module.exports = simulator;