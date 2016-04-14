var User = require('../../model/user');
var link = require('../../model/link');
var Cookies = require( "cookies" );
var express = require('express');
var cookieParser = require('cookie-parser');
var app = express();
var methodOverride = require('method-override');
app.use(cookieParser());
var url = require('url') ;
// var db = mongoose.connection;
exports.repository=function(req,res){

  User.findOne({token:req.cookies.token}, function (err, response) {
  // console.log(response);
  if(response){
        link.find({course:url.parse(req.url).pathname.split("/")[2]}, function (err, respo) {
            if(respo){
              respo = respo;
            }
            else{
              respo = null;
            }
      res.render('Repository',{data:respo});
    });
  }
  else{
    res.render('Authentication');
  }
});
};

exports.delRepository=function(req,res){

  User.findOne({token:req.cookies.token}, function (err, response) {
  // console.log(response);
  if(response){
        link.remove({text:req.body.text}, function (err, respo) {
          if(err) throw err;
          res.redirect('Repository');
        });
  }
  else{
    res.render('Authentication');
  }
});
};
