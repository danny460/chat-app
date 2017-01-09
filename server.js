var express = require('express'),
	http = require('http');
	app = express(),
	server = http.Server(app),
	io = require('socket.io')(server),
	portNumber = 3000;

app.use('/', express.static(__dirname));

io.on('connection', function(socket){
	console.log('a user is connected');
	socket.on('disconnect', function(){
		console.log('a user disconnected');
	});
});

server.listen(portNumber, function(){
	console.log('chat-app listening on:', portNumber);
});
