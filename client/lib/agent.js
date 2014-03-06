'use strict';

var fs = require('fs');
var q = require('q');
var opt = require('optimist');
var simulator = require('./simulator');
var logger = require('./logger');

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

	    var bank = {url: 'localhost'};
	    var orders = {
		user : 'affe@hk.se',
		pwd : 's3cr3t',
		action : 'apply'
	    };
	    simulator.run(bank, orders, logger);	    
	   
	}
    },
    
    
    
}

var srv = agent.launch(process.argv, simulator, logger);

module.exports = agent;