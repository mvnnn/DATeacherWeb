var User = require('../../model/user');
var mongoose=require('mongoose');
var dburl='mongodb://student:senteam15@ds011389.mlab.com:11389/courseaid';
mongoose.connect(dburl);

exports.myProfile=function(req,res){

  // var post = new User({
  //   name :"saifee",
  //   id : 201301146,
  //   DOB : "15-04-1996",
  //   MobileNumber : 5964954613
  // });

  // post.save(mongoose);

  mongoose.users.findOne({id:201301146},function(err,postss){
    if(err) throw err;
    return postss;
  });

  res.render('MyProfile');
};
