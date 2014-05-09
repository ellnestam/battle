'use strict';

var fs = require('fs');
var q = require('q');
var opt = require('optimist');
var http = require('http');

var port = 7331;

var srv = http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    var parsed = url.parse(req.url);
    var search = parsed.search;
    
    var message = parsed.pathname.split('/');
    console.log(req.url);
    
    console.log(message);
    
    if (url.pathname === 'account') {
	res.end('Account\n');
    }
    
    res.end('Unrecognized command\n');
});

var launcher = {
    run : function launcher(args) {
	if (args.length < 1) {
	    console.log('');
	    console.log("Usage: node launcher.js [datadir]");
	    console.log('');
	} else {
	    var dataDir = args[1];
	    var dest = opt.argv._[1];
	    console.log('Start having fun ...');
	    srv.listen(port)
	};
    }
}

var srv = launcher.run(process.argv);

module.exports = launcher;