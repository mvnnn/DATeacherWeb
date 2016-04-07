var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var postSchema= Schema({
  title:{
    type:String,
    required:true
  },
  text:{
    type:String,
    required:true
  },
  postedBy: {
      type: mongoose.Schema.Types.Mixed,
      ref: 'user'
  }
});

module.exports=mongoose.model('broadcast',postSchema);
