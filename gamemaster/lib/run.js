var http = require('http');
var faye = require('faye');
var url = require('url');
var fs = require('fs');

var port = '8008';


var server = http.createServer();
var bayeux = new faye.NodeAdapter({mount: '/gamemaster', timeout: 10});
bayeux.attach(server);
server.listen(8000);

var server = http.createServer(function(request, response) {
    response.writeHead(200, {'Content-Type': 'text/plain'});
    response.end('Hello, non-Bayeux request');
});

var client = bayeux.getClient();

console.error('Running Game Master');

var message = {servers : {'b1' : {score: '12'}}};

setInterval(function() {
    client.publish('/scores', message);
    console.log('Publishing: ' + message.servers.b1.score);
}, 5000);
