var User = require('../../model/user');
var Cookies = require( "cookies" );
var express = require('express');
var cookieParser = require('cookie-parser');
var app = express();
var methodOverride = require('method-override');
app.use(cookieParser());

exports.home=function(req,res){
  User.findOne({token:req.cookies.token}, function (err, response) {
    console.log(response);
    if(response){
      console.log(response.name);
      res.render('Home',{data:response.name});
    }
    else{
      res.redirect('Authentication');
    }
  });

};
