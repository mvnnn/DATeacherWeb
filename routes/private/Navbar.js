var User = require('../../model/user');
var Cookies = require( "cookies" );
var express = require('express');
var cookieParser = require('cookie-parser');
var app = express();
var methodOverride = require('method-override');
app.use(cookieParser());

exports.changePass=function(req,res){
  User.findOne({token:req.cookies.token}, function (err, response) {
    console.log(response);
    if(response){
      res.render('ChangePass');
    }
    else{
      res.render('Authentication');
    }
  });
};

exports.help=function(req,res){
  User.findOne({token:req.cookies.token}, function (err, response) {
    console.log(response);
    if(response){
      res.render('Help');
    }
    else{
      res.render('Authentication');
    }
  });
};

exports.logout=function(req,res){
  User.findOne({token:req.cookies.token}, function (err, response) {
    console.log(response);
    if(response){
      res.clearCookie('token');
      res.render('Authentication');
    }
    else{
      res.render('Authentication');
    }
  });
};
