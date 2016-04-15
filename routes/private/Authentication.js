var User = require('../../model/user');
var mongoose=require('mongoose');
var nodemailer = require('nodemailer');
var Cookies = require( "cookies" );
var express = require('express');
var cookieParser = require('cookie-parser');
var app = express();
var methodOverride = require('method-override');
app.use(cookieParser());

exports.authentication=function(req,res){

  res.render('Authentication');
};

exports.signUp=function(req,res){
  res.render('SignUp');
};

exports.signUpData=function(req,res){

  function generator(n){
    var tt="";
    var stringg="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890";
    for(var i=0;i<n;i++){
      tt += stringg.charAt(Math.floor(Math.random()*stringg.length));
    }
    return tt;
  };

  var pwd = generator(7);
  var gen_token = generator(4) + req.body.id + generator(4);

    var smtp = nodemailer.createTransport("SMTP", {
        service: "Gmail",
        auth: {
            user: "sen15.2016@gmail.com",
            pass: "******"
        }
    });



    mailList ={};
    mailList.to = req.body.id + "@daiict.ac.in";
    mailList.subject = "Your courseaid password";
    mailList.text = 'Your password is : "'+ pwd+'"';
    smtp.sendMail(mailList, function(error, response){
        if(error){
            console.log(error);
        }
        else{
            console.log("Message sent: " + response.message);

        }
    });

  User.update({id:req.body.id},
    {id:req.body.id,
    name:req.body.name,
    DOB:req.body.dob,
    password:pwd,
    token:gen_token},
    { upsert: true },
    function(err, response){
      if(err) throw err;
      else res.redirect('Authentication');
    });
};

exports.login=function(req,res){
  res.render('Login');
};

exports.loginAuth=function(req,res){
  User.findOne({id:req.body.id, password:req.body.password}, function (err, response) {
    if(response){
      // console.log(response.token);
      res.cookie('token', response.token, { maxAge: 900000000, httpOnly: true });
      res.redirect('Home');
    }
    else{
      res.redirect('SignUp');
    }

  });
};


exports.forget=function(req,res){
  res.render('Forget');
};


exports.postforget=function(req,res){
  User.findOne({id:req.body.id},
    function(err, response){
      if(err) throw err;

  var smtp = nodemailer.createTransport("SMTP", {
      service: "Gmail",
      auth: {
          user: "sen15.2016@gmail.com",
          pass: "senteam15"
      }
  });



  mailList ={};
  mailList.to = req.body.id + "@daiict.ac.in";
  mailList.subject = "Your courseaid Password";
  mailList.text = 'Your password is :  "'+ response.password+'"';
  smtp.sendMail(mailList, function(error, respons){
      if(error){
          console.log(error);
      }
      else{
          console.log("Message sent: " + respons.message);

      }
  });
res.redirect('Login');
  });
  };
