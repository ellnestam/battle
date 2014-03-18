'use strict';

var http = require('http');
var url = require('url');
var _ = require('lodash');

var port = 7331;

var simulator = {

    run : function(bank, order, logger) {
	var callUrl = url.format({hostname: bank.url,
				  port: port,
				  protocol: 'http',
				  pathname:  order.type + '/' + order.action,
				  search: simulator.credentials(order)
				 });

	console.log("URL: " + callUrl);

	http.get(callUrl, function(res) {
	    logger.success(bank, order);
	}).on('error', function(e) {
	    logger.fail(bank, order);
	});
	
    },

    credentials : function(order) {
	var res = _.map(order.parameters, function(val, key) {return key + "=" + val});
	return res.join("&");
    }
};

module.exports = simulator;