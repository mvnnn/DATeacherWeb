var User = require('../../model/user');
var Queries = require('../../model/queries');
var TCourse = require('../../model/tCourse');
var Cookies = require( "cookies" );
var express = require('express');
var cookieParser = require('cookie-parser');
var app = express();
var methodOverride = require('method-override');
app.use(cookieParser());
var url = require('url') ;
// var db = mongoose.connection;
exports.queires=function(req,res){
  User.findOne({token:req.cookies.token}, function (err, response) {
  // console.log(response);
  if(response){
        Queries.find({course:url.parse(req.url).pathname.split("/")[2]}, function (err, respo) {
            if(respo){
              respo = respo;
            }
            else{
              respo = null;
            }
      res.render('Queries',{data:respo});
    });
  }
  else{
    res.render('Authentication');
  }
});
};


exports.postQueires=function(req,res){
  User.findOne({token:req.cookies.token}, function (err, response) {
  // console.log(response);
    if(response){
          Queries.update({text:req.body.text},
            {std_id:req.body.std_id,
            course:req.body.course,
            text:req.body.text,
            comment:req.body.comment},
            { upsert: true },
            function(err, respo){
              if(err) throw err;
              else res.redirect('Queries');
            });
        }
  else{
    res.render('Authentication');
  }
});
};
