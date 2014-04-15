'use strict';

var fs = require('fs');
var q = require('q');
var opt = require('optimist');

var legacy {

    launch : function launcher(args) {
	if (args.length < 1) {
	    console.log('');
	    console.log("  Usage: node legacy.js [datadir]");
	    console.log('');
	} else {
	    var dataDir = args[1];
	    var dest = opt.argv._[1];
	    console.log('Start having fun ...');
	};
    }
}

var srv = legacy.launch(process.argv);

module.exports = legacy;