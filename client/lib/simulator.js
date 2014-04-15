'use strict';

var http = require('http');
var url = require('url');
var _ = require('lodash');

var port = 7331;

var simulator = {

    run : function(bank, order, logger, clientData) {
	var callUrl = url.format({hostname: bank.url,
				  port: port,
				  protocol: 'http',
				  pathname:  order.type + '/' + order.action,
				  search: simulator.credentials(order) + '&id=' + order.id
				 });

	console.log('Running order', order);

	http.get(callUrl, function(res) {
	    console.log('Doing business');
	}).on('error', function(e) {
	    // logger.fail(bank, order);
	});
	
	logger.success(bank, order, clientData);	

	return clientData;
    },

    credentials : function(order) {
	var res = _.map(order.parameters, function(val, key) {return key + "=" + val});
	return res.join("&");
    }
};

module.exports = simulator;