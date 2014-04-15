var http = require('http');
var faye = require('faye');
var url = require('url');

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
}).listen(port);
