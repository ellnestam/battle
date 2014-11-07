var http = require('http');
var faye = require('faye');
var url = require('url');
var fs = require('fs');

var port = '8008';


var bayeux = new faye.NodeAdapter({mount: '/gamemaster', timeout: 45}).listen(port);

var client = new faye.Client('http://localhost:8008/');

var message = {servers : {'b1' : {score: ''}}};


setInterval(function() {
        client.publish('/scores', message);
        }, 3000);