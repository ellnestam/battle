'use strict';

var http = require('http');
var url = require('url');
var _ = require('lodash');

var port = 7331;

var simulator = {

    run : function(bank, order, logger, clientData, callback) {
	var callUrl = url.format({hostname: bank.url,
				  port: port,
				  protocol: 'http',
				  pathname:  order.type + '/' + order.action,
				  search: simulator.credentials(order) + '&id=' + order.id
				 });

      console.log('Running order', order);

      var req = http.get(callUrl, function(res){
        var response = "";
        res.setEncoding('utf8');
        
        res.on('data', function(chunk){
          console.log("INFO: "+chunk);
          response += chunk;
        });

        res.on('end', function(){
          console.log("End received!");
          callback(response);
        });

        res.on('close', function(){
          console.log("Close received!");
          callback(response);
        });
      });

      return clientData;
    },

    credentials : function(order) {
	var res = _.map(order.parameters, function(val, key) {return key + "=" + val});
	return res.join("&");
    }
};

module.exports = simulator;
