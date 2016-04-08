var Grade = require('../../model/grade');
var mongoose=require('mongoose');
var xlsx_json = require('xls-to-json');

exports.myCourses=function(req,res){
  res.render('MyCourses');
};

exports.studentHome=function(req,res){
  res.render('StudentHome');
};

exports.studentList=function(req,res){
  res.render('StudentList');
};

exports.setCriteria=function(req,res){
  res.render('SetCriteria');
};

exports.uploadMarks=function(req,res){
  res.render('UploadMarks');
};

exports.setUploadMarks=function(req,res){
  // console.log(req.body.getfile);

xlsx_json({
  input: req.body.getfile,
  output: null
}, function(err, result) {
  if(err) {
    console.error(err);
  }else {
    console.log(result);
  }
});
  // res.render('UploadMarks');
};

exports.performanceStates=function(req,res){
  console.log(req.body.getfile);
};




/* Generate grade*/
exports.genGrades=function(req,res){
  Grade.findOne({_id:20111111}, function (err, response) {
    if(response){
      response = response;
    }
    else{
      response = null;
    }
   res.render('GenGrades',{data:response});
  });
  // var dd =null;
  // res.render('GenGrades',{data:null});
};

exports.storeGrades=function(req,res){

  Grade.remove({_id: 20111111},function(err){
    if(err) throw err;
  });
  var post = new Grade({
    AA:[{ min: req.body.AAmin, max:req.body.AAmax }],
    AB:[{ min: req.body.ABmin, max:req.body.ABmax }],
    BB:[{ min: req.body.BBmin, max:req.body.BBmax }],
    BC:[{ min: req.body.BCmin, max:req.body.BCmax }],
    CC:[{ min: req.body.CCmin, max:req.body.CCmax }],
    CD:[{ min: req.body.CDmin, max:req.body.CDmax }],
    DD:[{ min: req.body.DDmin, max:req.body.DDmax }],
    DE:[{ min: req.body.DEmin, max:req.body.DEmax }],
    F:[{ min: req.body.Fmin, max:req.body.Fmax }],
    _id:20111111
  });

  post.save(mongoose);
  console.log(post);
  res.render('GenGrades',{data:post});
};



exports.broadcast=function(req,res){
  res.render('Broadcast');
};
