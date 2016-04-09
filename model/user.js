var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var postSchema= Schema({
  _id:{
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
  }
});

module.exports=mongoose.model('user',postSchema);
