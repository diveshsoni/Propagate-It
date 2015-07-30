var express = require('express'),
	app = express(),
	server = require('http').createServer(app),
	io = require('socket.io').listen(server),
	clientNames = [];
	
server.listen(3000);

app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html');
});

io.sockets.on('connection', function(socket){
	socket.on('new user', function(data, callback){
		if (data == "Client"){
			callback("Client");
			clientNames.push(socket);
		} else if (data == "Server"){ 
			callback("Server");
		} else {
			callback("Error");
		}
	});

	socket.on('door', function(){
		for (var i = 0; i < clientNames.length; i++) {
			clientNames[i].emit('event notify', {msg :'Door'});
		}
	});

	socket.on('alarm', function(){
		for (var i = 0; i < clientNames.length; i++) {
			clientNames[i].emit('event notify', {msg :'Alarm'});
		}
	});

	socket.on('fire', function(){
		for (var i = 0; i < clientNames.length; i++) {
			clientNames[i].emit('event notify', {msg :'Fire'});
		}
	});
	

	socket.on('Custom Notification', function(data){
		for (var i = 0; i < clientNames.length; i++) {
			clientNames[i].emit('notify', {msg : data});
		}
	});

	
});