var User = require('../../model/user');
var Cookies = require( "cookies" );
var express = require('express');
var cookieParser = require('cookie-parser');
var app = express();
var methodOverride = require('method-override');
app.use(cookieParser());



exports.changePass=function(req,res){
  User.findOne({token:req.cookies.token}, function (err, response) {
    // console.log(response);
    if(response){
      res.render('ChangePass');
    }
    else{
      res.render('Authentication');
    }
    });
};

exports.PostchangePass=function(req,res){
  User.findOne({token:req.cookies.token}, function (err, response) {
    // console.log(response);
    if(response){
      User.update({id:response.id},
        {id:response.id,
        name:response.name,
        DOB:response.dob,
        password:req.body.confirmPassword,
        token:response.token},
        { upsert: true },
        function(err, response){
          if(err) throw err;
          else res.redirect('Home');
        });
    }
    else{
      res.render('Authentication');
    }
    });
};

exports.help=function(req,res){
  User.findOne({token:req.cookies.token}, function (err, response) {
    // console.log(response);
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
    // console.log(response);
    if(response){
      res.clearCookie('token');
      res.redirect('Authentication');
    }
    else{
      res.render('Authentication');
    }
  });
};
