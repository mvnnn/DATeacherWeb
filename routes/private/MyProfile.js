var User = require('../../model/user');
var mongoose=require('mongoose');
// var db = mongoose.connection;
exports.myProfile=function(req,res){

  // var post = new User({
  //   name :"saifee12",
  //   _id : 201301142,
  //   DOB : "15-04-1996"
  // });
  //
  // post.save(mongoose);

  User.findOne({_id:201301142}, function (err, response) {
    // console.log(err, response);
  //  res.send(response);
   res.render('MyProfile',{data:response});
  });


};
