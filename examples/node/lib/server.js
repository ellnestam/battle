var http = require('http');
var url = require('url');

var port = 7331;

var srv = http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  var parsed = url.parse(req.url, true);
  var query = parsed.query;
  
  var message = parsed.pathname.split('/');
  
  var action = message[1];
  if (action === 'account') {
    console.log('Account!');
    res.end(query.id);
  } else if (action === 'loan') {
    console.log('Loan!');
    res.end(query.id);
  }
  
  res.end('Unrecognized command\n');
});

var launcher = {
    run : function launcher(args) {
	if (args.length < 1) {
	    console.log('');
	    console.log("Usage: node launcher.js");
	    console.log('');
	} else {
	    console.log('The Bank is open for business');
	    srv.listen(port)
	};
    }
}

var srv = launcher.run(process.argv);

module.exports = launcher;
