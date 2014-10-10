var http = require('http');
var faye = require('faye');
var url = require('url');

var port = 7331;

var srv = http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    var parsed = url.parse(req.url);
    var search = parsed.search;
    
    var message = parsed.pathname.split('/');
    
    if (url.pathname === 'account') {
      res.end(url.id + '\n');
    }

    res.end('Unrecognized command\n');
}).listen(port);
