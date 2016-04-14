//  mongodb schema to store information about the user namely his password, name, and date of birth;  It also contains unique token generated for accessing the schema

var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var postSchema= Schema({
  id:{
    type:Number,
    required:true
  },
  name:{
    type:String,
    required:true
  },
  DOB:{
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

module.exports=mongoose.model('user',postSchema);
