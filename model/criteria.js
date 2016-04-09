var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var postSchema= Schema({
  _id:{
    type:Number,
    require:true
  },
  insem1:{
    type:Number
  },
  insem2:{
    type:Number
  },
  endsem:{
    type:Number
  },
  lab:{
    type:Number
  },
  project:{
    type:Number
  },
  attendance:{
    type:Number
  }
});

module.exports=mongoose.model('criteria',postSchema);
