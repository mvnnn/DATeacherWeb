var Grade = require('../../model/grade');
var Criteria = require('../../model/criteria');
var mongoose=require('mongoose');
var xlsx_json = require('xls-to-json');
var multer	=	require('multer');

exports.myCourses=function(req,res){
  res.render('MyCourses');
};

exports.studentHome=function(req,res){
  res.render('StudentHome');
};

exports.studentList=function(req,res){
  res.render('StudentList');
};



/* set Criteria */
exports.setCriteria=function(req,res){

  Criteria.findOne({_id:20111111}, function (err, response) {
    console.log(response);
    if(response){
      response = response;
    }
    else{
      response = null;
    }
   res.render('SetCriteria',{data:response});
  });
};

exports.saveSetCriteria=function(req,res){

  Criteria.remove({_id: 20111111},function(err){
    if(err) throw err;
  });
  var post = new Criteria({
    _id:20111111,
    insem1:req.body.insem1,
    insem2:req.body.insem2,
    endsem:req.body.endsem,
    project:req.body.project,
    lab:req.body.lab,
    attendance:req.body.attendance
  });

  post.save(mongoose);
  // console.log(post);
  res.render('SetCriteria',{data:post});
};





exports.uploadMarks=function(req,res){
  res.render('UploadMarks');
};

exports.setUploadMarks=function(req,res){

  var storage	=	multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, '../../public/uploads');
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname + '-' + Date.now());
  }
});
var upload = multer({ storage : storage}).single('getfile');

upload(req,res,function(err) {
		if(err) {
			return res.end("Error uploading file.");
		}
		res.end("File is uploaded");
	});

// xlsx_json({
//   input: req.body.getfile,
//   output: null
// }, function(err, result) {
//   if(err) {
//     console.error(err);
//   }else {
//     console.log(result);
//   }
// });
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
  // console.log(post);
  res.render('GenGrades',{data:post});
};



exports.broadcast=function(req,res){
  res.render('Broadcast');
};
