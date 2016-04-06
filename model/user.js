var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var postSchema= Schema({
  name:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true
  },
  DOB:{
    type:String,
    required:true
  }
});

module.exports=mongoose.model('user',postSchema);
