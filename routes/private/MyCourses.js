var Grade = require('../../model/grade');
var Criteria = require('../../model/criteria');
var Upload = require('../../model/upload');
var PComment = require('../../model/pComment');
var TCourse = require('../../model/tCourse');
var User = require('../../model/user');
var Broadcast = require('../../model/broadcast');
var Cookies = require( "cookies" );
var express = require('express');
var cookieParser = require('cookie-parser');
var app = express();
var methodOverride = require('method-override');
app.use(cookieParser());
var mongoose=require('mongoose');
var url = require('url') ;

exports.myCourses=function(req,res){
  User.findOne({token:req.cookies.token}, function (err, response) {
    // console.log(response);
    if(response){

      TCourse.findOne({id:response.id}, function (err, respo) {
        // console.log(response.id);
        // console.log(respo);
        if(respo){
          respo = respo;
        }
        else{
          respo = null;
        }
       res.render('MyCourses',{data:respo});
      });
    }
    else{
      res.render('Authentication');
    }
  });
};


exports.studentHome=function(req,res){
  User.findOne({token:req.cookies.token}, function (err, response) {
    // console.log(response);
    if(response){
      // console.log(url.parse(req.url).pathname.split("/")[2]);
      res.render('StudentHome');
    }
    else{
      res.render('Authentication');
    }
  });
};

exports.studentList=function(req,res){
  User.findOne({token:req.cookies.token}, function (err, response) {
    // console.log(response);
    if(response){
      Upload.find({id:response.id, course:url.parse(req.url).pathname.split("/")[2]}, function (err, respo) {
        // console.log(response);
        if(response){
          respo = respo;
        }
        else{
          respo = null;
        }
       res.render('StudentList',{data:respo});
      });
    }
    else{
      res.render('Authentication');
    }
  });
};

exports.postStudentList=function(req,res){
  User.findOne({token:req.cookies.token}, function (err, response) {
    // console.log(response);
    if(response){
      PComment.update({id:response.id, course:url.parse(req.url).pathname.split("/")[2],std_id:req.body.ID},
        {id:response.id,
        course:url.parse(req.url).pathname.split("/")[2],
        std_id:req.body.ID,
        post:req.body.data},
        { upsert: true },
        function(err, response){
          if(err) throw err;
          else res.redirect('StudentList');
        });
      }
    else{
      res.render('Authentication');
    }
  });
};




/* set Criteria */
exports.setCriteria=function(req,res){

  User.findOne({token:req.cookies.token}, function (err, response) {
    // console.log(response);
    if(response){
      Criteria.findOne({id:response.id, course:url.parse(req.url).pathname.split("/")[2]}, function (err, respo) {
        // console.log(response);
        if(response){
          respo = respo;
        }
        else{
          respo = null;
        }
       res.render('SetCriteria',{data:respo});
      });
    }
    else{
      res.render('Authentication');
    }
    });
};

exports.saveSetCriteria=function(req,res){

  // Criteria.remove({id: 20111111},function(err){
  //   if(err) throw err;
  // });
  User.findOne({token:req.cookies.token}, function (err, response) {
    // console.log(response);
    if(response){
      Criteria.update({id:response.id, course:url.parse(req.url).pathname.split("/")[2]},
        {id:response.id,
        course:url.parse(req.url).pathname.split("/")[2],
        insem1:req.body.insem1,
        insem2:req.body.insem2,
        endsem:req.body.endsem,
        project:req.body.project,
        lab:req.body.lab,
        attendance:req.body.attendance},
        { upsert: true },
        function(err, response){
          if(err) throw err;
          else res.redirect('SetCriteria');
        });
    }
    else{
      res.render('Authentication');
    }
    });
  // var post = new Criteria({
  //   id:20111111,
  //   course:"EL203",
  //   insem1:req.body.insem1,
  //   insem2:req.body.insem2,
  //   endsem:req.body.endsem,
  //   project:req.body.project,
  //   lab:req.body.lab,
  //   attendance:req.body.attendance
  // });
  //
  // post.save(mongoose);
  // // console.log(post);
  // res.render('SetCriteria',{data:post});
};





exports.uploadMarks=function(req,res){
  var data = null;
  res.render('UploadMarks',{data:data});
};

exports.setUploadMarks=function(req,res){
  var n = (req.body.line.length-1) / 6;
  User.findOne({token:req.cookies.token}, function (err, response) {
    if(response){
      for (i = 1; i < n; i++) {
        var ee = req.body.line[6*i].split("\n");
        var ww;
        if(i<(n-1)){
        var www = req.body.line[(6*i)+6].split("\n");
        ww = www[0];
        }
        else{
          ww = req.body.line[(6*i)+6];
        }

      Upload.update({id:response.id, course:url.parse(req.url).pathname.split("/")[2],std_id:ee[1]},
        {id:response.id,
        course:url.parse(req.url).pathname.split("/")[2],
        std_id:ee[1],
        insem1:req.body.line[(6*i)+1],
        insem2:req.body.line[(6*i)+2],
        endsem:req.body.line[(6*i)+3],
        project:req.body.line[(6*i)+4],
        lab:req.body.line[(6*i)+5],
        attendance:ww},
        { upsert: true },
        function(err, res){
          if(err) throw err;
          // else res.redirect('UploadMarks');
        }
    );
  }
}
    else{
      res.render('Authentication');
    }
    });

};



exports.StudentMarksList=function(req,res){

  User.findOne({token:req.cookies.token}, function (err, response) {
    // console.log(response);
    if(response){
      Upload.find({id:response.id, course:url.parse(req.url).pathname.split("/")[2]}, function (err, respo) {
        console.log(respo);
        if(response){
          respo = respo;
        }
        else{
          respo = null;
        }
       res.render('StudentMarksList',{data:respo});
      });
    }
    else{
      res.render('Authentication');
    }
    });
};



exports.UpdateStudentMarksList=function(req,res){

  User.findOne({token:req.cookies.token}, function (err, response) {
    // console.log(response);
    if(response){
      Upload.update({id:response.id, course:url.parse(req.url).pathname.split("/")[2],std_id:req.body.std_id},
        {id:response.id,
        course:url.parse(req.url).pathname.split("/")[2],
        std_id:req.body.std_id,
        insem1:req.body.insem1,
        insem2:req.body.insem2,
        endsem:req.body.endsem,
        project:req.body.project,
        lab:req.body.lab,
        attendance:req.body.attendance},
        { upsert: true },
        function(err, response){
          if(err) throw err;
          else res.redirect('StudentMarksList');
        });
    }
    else{
      res.render('Authentication');
    }
    });
};



exports.performanceStates=function(req,res){
  User.findOne({token:req.cookies.token}, function (err, response) {
    // console.log(response);
    if(response){
      Upload.find({id:response.id, course:url.parse(req.url).pathname.split("/")[2]}, function (err, respo) {
        console.log(respo);
        if(response){
          respo = respo;
        }
        else{
          respo = null;
        }
       res.render('PerformanceStates',{data:respo});
      });
    }
    else{
      res.render('Authentication');
    }
    });
};




/* Generate grade*/
exports.genGrades=function(req,res){

  User.findOne({token:req.cookies.token}, function (err, response) {
    // console.log(response);
    if(response){
      Grade.findOne({id:response.id, course:url.parse(req.url).pathname.split("/")[2]}, function (err, respo) {
        if(respo){
          respo = respo;
        }
        else{
          response = null;
        }
       res.render('GenGrades',{data:respo});
      });
    }
    else{
      res.render('Authentication');
    }
  });
};

exports.storeGrades=function(req,res){

  // Grade.remove({id: 20111111},function(err){
  //   if(err) throw err;
  // });
  User.findOne({token:req.cookies.token}, function (err, response) {
    // console.log(response);
    if(response){

  Grade.update({id:response.id, course:url.parse(req.url).pathname.split("/")[2]},
    {   AA:[{ min: req.body.AAmin, max:req.body.AAmax }],
        AB:[{ min: req.body.ABmin, max:req.body.ABmax }],
        BB:[{ min: req.body.BBmin, max:req.body.BBmax }],
        BC:[{ min: req.body.BCmin, max:req.body.BCmax }],
        CC:[{ min: req.body.CCmin, max:req.body.CCmax }],
        CD:[{ min: req.body.CDmin, max:req.body.CDmax }],
        DD:[{ min: req.body.DDmin, max:req.body.DDmax }],
        DE:[{ min: req.body.DEmin, max:req.body.DEmax }],
        F:[{ min: req.body.Fmin, max:req.body.Fmax }],
        id:response.id,
        course:url.parse(req.url).pathname.split("/")[2]},
        { upsert: true },
    function(err){
      if(err) throw err;
      else res.redirect('GenGrades');
    });
}
else{
  res.render('Authentication');
}
});
};


exports.broadcast=function(req,res){
  User.findOne({token:req.cookies.token}, function (err, response) {
    // console.log(response);
    if(response){
      res.render('Broadcast');
    }
    else{
      res.render('Authentication');
    }
    });
};


exports.postBroadcast=function(req,res){
  User.findOne({token:req.cookies.token}, function (err, response) {
    // console.log(response);
    if(response){
      Broadcast.update({id:response.id, course:req.body.course, text:req.body.text},
        {id:response.id,
        course:req.body.course,
        text:req.body.text,
        comment:req.body.comment},
        { upsert: true },
        function(err, response){
          if(err) throw err;
          else res.redirect('Broadcast');
        });
    }
    else{
      res.render('Authentication');
    }
    });
};
