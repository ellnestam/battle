'use strict';

var fs = require('fs');
var q = require('q');
var opt = require('optimist');
var simulator = require('./simulator');
var logger = require('./logger');
var parser = require('./orderParser');
var fs = require('fs');
var _ = require('lodash');

var agent = {

    launch : function launcher(args, simulator, logger) {
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
		var sim = agent.createSimulator(bank, logger, clientData, Date.now());
		_.each(orders, sim);
	    });
	}
    },
    
    createSimulator : function (bank, logger, clientData) {
	return function(orders) {
	    simulator.run(bank, orders, logger, clientData);
	}
    },
       
}

var srv = agent.launch(process.argv, simulator, logger);

module.exports = agent;