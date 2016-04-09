var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var postSchema= Schema({
  id:{
    type:Number,
    require:true
  },
  course_id:{
    type:String
  },
  std_id:{
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
  attendence:{
    type:Number
  }
});

module.exports=mongoose.model('upload',postSchema);
