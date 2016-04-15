//  mongodb schema to store the marks of each of the components for a specific course

var mongoose = require('mongoose');

var PostSchema = new mongoose.Schema({
  id:{
    type:Number
  },
  course:{
    type:String
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

module.exports = mongoose.model("criteria", PostSchema);
