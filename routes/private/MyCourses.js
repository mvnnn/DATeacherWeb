
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

exports.performanceStates=function(req,res){
  res.render('PerformanceStates');
};

exports.genGrades=function(req,res){
  res.render('GenGrades');
};

exports.broadcast=function(req,res){
  res.render('Broadcast');
};
