var User = require('../../model/user');
var mongoose=require('mongoose');
var dburl='mongodb://*****:****@ds011389.mlab.com:11389/courseaid';
mongoose.connect(dburl);

exports.myProfile=function(req,res){

  var post = new User({
    name :"aaaaa",
    email : "abcd@gmail.com",
    DOB : "15-04-1999"
  });

  post.save(mongoose);
  res.render('MyProfile');
};
