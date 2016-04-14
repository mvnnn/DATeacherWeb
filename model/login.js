//  mongodb schema to store the login information entered by the user

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PostSchema = new mongoose.Schema({
  id:{
    type:String,
    required:true
  },
  password:{
    type:String,
    required:true
  },
  token:{
    type:String,
    required:true
  }
});

module.exports = mongoose.model("login", PostSchema);
