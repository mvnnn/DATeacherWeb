var express = require('express');
var http=require ('http');
var path = require('path');
var favicon = require('serve-favicon');
var route = require ('./routes/index');

var mongoose=require('mongoose');

var bodyparser=require('body-parser');
var port=process.env.PORT || 3000 ;


var app = express();
app.set('view engine', 'jade');
app.use(bodyparser.urlencoded({ extended: true }));
app.use(favicon(path.join('public','bb.ico')));
app.use(bodyparser.json());
var methodOverride = require('method-override');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', route.index );
app.post('/',route.new_post);


http.createServer(app).listen(port);
console.log('port listen at :'+ Number(port));
