var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PostSchema = new mongoose.Schema({
  _id:{
    type:String,
    required:true
  },
  password:{
    type:String,
    required:true
  }
});

module.exports = mongoose.model("login", PostSchema);
