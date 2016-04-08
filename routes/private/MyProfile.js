var User = require('../../model/user');
// var db = mongoose.connection;
exports.myProfile=function(req,res){

  // var post = new User({
  //   name :"saifee12",
  //   id : 201301146,
  //   DOB : "15-04-1996",
  //   MobileNumber : 5964954613
  // });
  //
  // post.save(db);

  User.findOne({id:201301146}, function (err, response) {
    // console.log(err, response);
  //  res.send(response);
   res.render('MyProfile',{data:response});
  });


};
