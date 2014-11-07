var http = require('http');
var faye = require('faye');
var url = require('url');


var port = '8008';

var server = http.createServer();

var bayeux = new faye.NodeAdapter({mount: 'battle-master', timeout: 45});

bayeux.attach(server);
server.listen(8008);

var client = new faye.Client('http://localhost:8000/');

var message = {servers : {'b1' : {score: ''}}};


setInterval(function() {
        client.publish('/scores', message);
        }, 3000);

