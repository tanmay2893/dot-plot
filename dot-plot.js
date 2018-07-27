var app = require('express')();
var logger = require('morgan');
var http = require('http').Server(app);
var express = require('express');


app.use(logger('dev'));
app.use('/javascripts',express.static(__dirname+'/javascripts'));
app.use('/styles',express.static(__dirname+'/styles'));
app.get('/',function(req,res){
	var ip=req.connection.remoteAddress;
	console.log('ip: '+ip);
	res.sendfile('home.html')
});
app.get('/image',function(req,res){
	var ip=req.connection.remoteAddress;
	console.log('Entered in image: '+ip);
	res.sendfile('index2.html')
});
app.get('/animation',function(req,res){
	var ip=req.connection.remoteAddress;
	console.log('Entered In animation: '+ip);
	res.sendfile('index3.html')
});
var port=process.env.PORT||80;
app.listen(port,function(err){
	console.log('listening on *3000');
});