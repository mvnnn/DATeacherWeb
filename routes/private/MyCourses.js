var Grade = require('../../model/grade');
var Criteria = require('../../model/criteria');
var User = require('../../model/user');
var Cookies = require( "cookies" );
var express = require('express');
var cookieParser = require('cookie-parser');
var app = express();
var methodOverride = require('method-override');
app.use(cookieParser());
var mongoose=require('mongoose');



exports.myCourses=function(req,res){
  User.findOne({token:req.cookies.token}, function (err, response) {
    // console.log(response);
    if(response){
      res.render('MyCourses');
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
      res.render('StudentList');
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
      Criteria.findOne({id:response.id}, function (err, respo) {
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
      Criteria.update({id:response.id, course:"EL203"},
        {id:response.id,
        course:"EL203",
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
  res.render('UploadMarks');
};

exports.setUploadMarks=function(req,res){
  // console.log(";;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;");
  // console.log(req.body.getfile);
  res.render('UploadMarks');
};





exports.performanceStates=function(req,res){
  console.log(req.body.getfile);
};




/* Generate grade*/
exports.genGrades=function(req,res){
  Grade.findOne({id:20111111}, function (err, response) {
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

  // Grade.remove({id: 20111111},function(err){
  //   if(err) throw err;
  // });

  Grade.update({id:20111111, course:"EL203"},
    {   AA:[{ min: req.body.AAmin, max:req.body.AAmax }],
        AB:[{ min: req.body.ABmin, max:req.body.ABmax }],
        BB:[{ min: req.body.BBmin, max:req.body.BBmax }],
        BC:[{ min: req.body.BCmin, max:req.body.BCmax }],
        CC:[{ min: req.body.CCmin, max:req.body.CCmax }],
        CD:[{ min: req.body.CDmin, max:req.body.CDmax }],
        DD:[{ min: req.body.DDmin, max:req.body.DDmax }],
        DE:[{ min: req.body.DEmin, max:req.body.DEmax }],
        F:[{ min: req.body.Fmin, max:req.body.Fmax }],
        id:20111111,
        course:"EL203"},
        { upsert: true },
    function(err){
      if(err) throw err;
      else res.redirect('GenGrades');
    });

  // var post = new Grade({
  //   AA:[{ min: req.body.AAmin, max:req.body.AAmax }],
  //   AB:[{ min: req.body.ABmin, max:req.body.ABmax }],
  //   BB:[{ min: req.body.BBmin, max:req.body.BBmax }],
  //   BC:[{ min: req.body.BCmin, max:req.body.BCmax }],
  //   CC:[{ min: req.body.CCmin, max:req.body.CCmax }],
  //   CD:[{ min: req.body.CDmin, max:req.body.CDmax }],
  //   DD:[{ min: req.body.DDmin, max:req.body.DDmax }],
  //   DE:[{ min: req.body.DEmin, max:req.body.DEmax }],
  //   F:[{ min: req.body.Fmin, max:req.body.Fmax }],
  //   id:20111111,
  //   course:"EL203"
  // });
  //
  // post.save(mongoose);
  // // console.log(post);
  // res.render('GenGrades',{data:post});
};



exports.broadcast=function(req,res){
  res.render('Broadcast');
};
