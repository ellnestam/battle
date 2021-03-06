'use strict';

var fs = require('fs');
var q = require('q');
var opt = require('optimist');
var orderRunner = requir%e('./orderRunner');
var logger = require('./logger');
var parser = require('./orderParser');
var fs = require('fs');
var _ = require('lodash');

var agent = {
  launch : function launcher(args, orderRunner, logger) {
    if (args.length < 1) {
      console.log('');
      console.log("  Usage: node agent.js [datadir]");
      console.log('');
    } else {
      var dataDir = args[1];
      var dest = opt.argv._[1];
      console.log('Simulating business ...');

      var clientData = {};
      
      fs.readFile('data/open_account.order', function(err, data) {
	if (err) {
	  console.log(err);
	}
	
	var orders = JSON.parse(data);
	var bank = {url: 'localhost'};
        agent.runMe(bank, orders, 0, logger, clientData);
      });
    }
  },
  
  runMe : function(bank, orders, i, logger, clientData) {
    setTimeout(function() {
      orderRunner.run(bank, orders[i], logger, clientData, function(response) {
        if (i >= orders.length - 1) {
          console.log('Ran script');
        } else if (response === orders[i].id) {
          agent.runMe(bank, orders, i+1, logger, response);
        } else {
          console.log('Bank could not handle scenario');
        }
          
      });
    }, orders[i].delay * 1000);
    
  }
}

  

var srv = agent.launch(process.argv, orderRunner, logger);

module.exports = agent;
