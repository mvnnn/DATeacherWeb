var Grade = require('../../model/grade');
var Criteria = require('../../model/criteria');
var Upload = require('../../model/upload');
var stdUpload = require('../../model/stdupload');
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


/*
exports.StudentMarksList=function(req,res){

  User.findOne({token:req.cookies.token}, function (err, response) {
    // console.log(response);
    if(response){
      Upload.find({id:response.id, course:url.parse(req.url).pathname.split("/")[2]}, function (err, respo) {
        console.log(respo);
                if(respo){
        			Criteria.findOne({id:response.id, course:url.parse(req.url).pathname.split("/")[2]}, function (err, respon) {
        		// console.log(response);
        		if(respon){
          			respon = respon;
          			//console.log(respon.insem1);
          			//console.log(respo[0].insem1);

          			//var students = [['201301001',15,25,35,45,35,5],['201301002',25,35,45,15,5,10],['201301003',35,25,45,45,15,0],['201301004',25,45,35,25,15,8],['201301005',15,25,35,35,25,10]];
          			var students = [];
					      var criteria = [];
					      var max_marks = [60,60,45,40,50,10];
					      var Aggregate = [];
					      var grades = [];
                		  var average = [0,0,0,0,0,0];
                		  var max = [0,0,0,0,0,0];

					      for (var i=0; i < respo.length; i++) {
    					  students[i] = [];
        				students[i][0] = respo[i].std_id;
        				students[i][1] = respo[i].insem1;
        				students[i][2] = respo[i].insem2;
        				students[i][3] = respo[i].endsem;
        				students[i][4] = respo[i].project;
        				students[i][5] = respo[i].lab;
        				students[i][6] = respo[i].attendance;
        				Aggregate[i] = 0;

                if(students[i][1] > max[0])
                  max[0] = students[i][1];
                if(students[i][2] > max[1])
                  max[1] = students[i][2];
                if(students[i][3] > max[2])
                  max[2] = students[i][3];
                if(students[i][4] > max[3])
                  max[3] = students[i][4];
                if(students[i][5] > max[4])
                  max[4] = students[i][5];
                if(students[i][6] > max[5])
                  max[5] = students[i][6];
					      }

					criteria[0] = respon.insem1;
					criteria[1] = respon.insem2;
					criteria[2] = respon.endsem;
					criteria[3] = respon.project;
					criteria[4] = respon.lab;
					criteria[5] = respon.attendance;

					for (var i=0; i < respo.length; i++){
    					for(var j = 1;j<7;j++){

        					Aggregate[i] += criteria[j-1]*(students[i][j])/max_marks[j-1];
    					}
    					//console.log(Aggregate[i]);
					}

					for(var j=0;j<students.length;j++){

        				average[0] += students[j][1];
                average[1] += students[j][2];
                average[2] += students[j][3];
                average[3] += students[j][4];
                average[4] += students[j][5];
                average[5] += students[j][6];
                if (Aggregate[j] < 20){
          					//console.log("Grade : FF");
          					grades[j] = "FF";
          					console.log(grades[j]);
        				}
       	 				else if (Aggregate[j] >= 20 && Aggregate[j] < 30){
          					//console.log("Grade : DE");
          					grades[j] = "DE";
          					console.log(grades[j]);
       	 				}
        				else if (Aggregate[j] >= 30 && Aggregate[j] < 40){
          					//console.log("Grade : DD");
          					grades[j] = "DD";
          					console.log(grades[j]);
          			}
     					  else if (Aggregate[j] >= 40 && Aggregate[j] < 50){
                			//console.log("Grade : CD");
                			grades[j] = "CD";
                			console.log(grades[j]);
     					  }
        				else if (Aggregate[j] >= 50 && Aggregate[j] < 60){
                			//console.log("Grade : CC");
                			grades[j] = "CC";
                			console.log(grades[j]);
        				}
        				else if (Aggregate[j] >= 60 && Aggregate[j] < 70){
                			//console.log("Grade : BC");
                			grades[j] = "BC";
                			console.log(grades[j]);
        				}
        				else if (Aggregate[j] >= 70 && Aggregate[j] < 80){
                			//console.log("Grade : BB");
                			grades[j] = "BB";
                			console.log(grades[j]);
        				}
        				else if (Aggregate[j] >= 80 && Aggregate[j] < 90){
                			//console.log("Grade : AB");
                			grades[j] = "AB";
                			console.log(grades[j]);
        				}
        				else if (students[j] >= 90 && students[j] < 100){
                			//console.log("Grade : AA");
                			grades[j] = "AA";
                			console.log(grades[j]);
        				}
					   }
              }
      });
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
*/

exports.StudentMarksList=function(req,res){

  User.findOne({token:req.cookies.token}, function (err, response) {
    // console.log(response);
    if(response){
      Upload.find({id:response.id, course:url.parse(req.url).pathname.split("/")[2]}, function (err, respo) {
        //console.log(respo[0].std_id);
        if(respo){
        	Criteria.findOne({id:response.id, course:url.parse(req.url).pathname.split("/")[2]}, function (err, respon) {
        		console.log(respon);
        		if(respon){
          			respon = respon;

          			//var students = [['201301001',15,25,35,45,35,5],['201301002',25,35,45,15,5,10],['201301003',35,25,45,45,15,0],['201301004',25,45,35,25,15,8],['201301005',15,25,35,35,25,10]];
          			      var students = [];
					      var criteria = [];
					      var max_marks = [60,60,45,40,50,10];
					      var Aggregate = [];
					      var grades = [];
                          //var average = [0,0,0,0,0,0];
                		  //var max = [0,0,0,0,0,0];

					      for (var i=0; i < respo.length; i++) {
    					  students[i] = [];
        				  students[i][0] = respo[i].std_id;
        				  students[i][1] = respo[i].insem1;
        				  students[i][2] = respo[i].insem2;
        				  students[i][3] = respo[i].endsem;
        				  students[i][4] = respo[i].project;
        				  students[i][5] = respo[i].lab;
        				  students[i][6] = respo[i].attendance;
        				  Aggregate[i] = 0;
        		/*
                if(students[i][1] > max[0])
                  max[0] = students[i][1];
                if(students[i][2] > max[1])
                  max[1] = students[i][2];
                if(students[i][3] > max[2])
                  max[2] = students[i][3];
                if(students[i][4] > max[3])
                  max[3] = students[i][4];
                if(students[i][5] > max[4])
                  max[4] = students[i][5];
                if(students[i][6] > max[5])
                  max[5] = students[i][6];
              */
					      }

					criteria[0] = respon.insem1;
					criteria[1] = respon.insem2;
					criteria[2] = respon.endsem;
					criteria[3] = respon.project;
					criteria[4] = respon.lab;
					criteria[5] = respon.attendance;

					for (var i=0; i < respo.length; i++){
    					for(var j = 1;j<7;j++){

        					Aggregate[i] += criteria[j-1]*(students[i][j])/max_marks[j-1];
    					}
    					//console.log(Aggregate[i]);
					}

					for(var j=0;j<students.length;j++){

        				//average[0] += students[j][1];
                		//average[1] += students[j][2];
                		//average[2] += students[j][3];
                		//average[3] += students[j][4];
                		//average[4] += students[j][5];
                		//average[5] += students[j][6];
                		if (Aggregate[j] < 20 ){
          					//console.log("Grade : FF");
          					grades[j] = "FF";
          					console.log(grades[j]);
        				}
       	 				else if (Aggregate[j] >= 20 && Aggregate[j] < 30){
          					//console.log("Grade : DE");
          					grades[j] = "DE";
          					console.log(grades[j]);
       	 				}
        				else if (Aggregate[j] >= 30 && Aggregate[j] < 40){
          					//console.log("Grade : DD");
          					grades[j] = "DD";
          					console.log(grades[j]);
          			}
     					  else if (Aggregate[j] >= 40 && Aggregate[j] < 50){
                			//console.log("Grade : CD");
                			grades[j] = "CD";
                			console.log(grades[j]);
     					  }
        				else if (Aggregate[j] >= 50 && Aggregate[j] < 60){
                			//console.log("Grade : CC");
                			grades[j] = "CC";
                			console.log(grades[j]);
        				}
        				else if (Aggregate[j] >= 60 && Aggregate[j] < 70){
                			//console.log("Grade : BC");
                			grades[j] = "BC";
                			console.log(grades[j]);
        				}
        				else if (Aggregate[j] >= 70 && Aggregate[j] < 80){
                			//console.log("Grade : BB");
                			grades[j] = "BB";
                			console.log(grades[j]);
        				}
        				else if (Aggregate[j] >= 80 && Aggregate[j] < 90){
                			//console.log("Grade : AB");
                			grades[j] = "AB";
                			console.log(grades[j]);
        				}
        				else if (students[j] >= 90 && students[j] < 100){
                			//console.log("Grade : AA");
                			grades[j] = "AA";
                			console.log(grades[j]);
        				}

        				console.log(respo[j].std_id+" "+respo[j].insem1 +" "+respo[j].insem2 +" "+respo[j].endsem +" "+grades[j]);

        				stdUpload.update({course:url.parse(req.url).pathname.split("/")[2], std_id:respo[j].std_id},
        					{id:response.id,
        					course:url.parse(req.url).pathname.split("/")[2],
        					std_id:respo[j].std_id,
        					insem1:respo[j].insem1,
        					insem2:respo[j].insem2,
        					endsem:respo[j].endsem,
        					project:respo[j].project,
        					lab:respo[j].lab,
        					attendance:respo[j].attendance,
        					getgrade:grades[j]},
        					{ upsert: true },
        					function(err, res){
          						if(err) throw err;
          						// else res.redirect('UploadMarks');
        					});
					   }

             stdUpload.find({id:response.id, course:url.parse(req.url).pathname.split("/")[2]}, function(err, ressss){
               res.render('StudentMarksList',{data:ressss});
             });


          }
      });
        }
        else{
          respo = null;
        }
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
        attendance:req.body.attendance,
        getgrade:req.body.gengrade},
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



// exports.performanceStates=function(req,res){
//   User.findOne({token:req.cookies.token}, function (err, response) {
//     // console.log(response);
//     if(response){
//       Upload.find({id:response.id, course:url.parse(req.url).pathname.split("/")[2]}, function (err, respo) {
//         console.log(respo);
//         if(response){
//           respo = respo;
//         }
//         else{
//           respo = null;
//         }
//        res.render('PerformanceStates',{data:respo});
//       });
//     }
//     else{
//       res.render('Authentication');
//     }
//     });
// };


exports.performanceStates=function(req,res){
  User.findOne({token:req.cookies.token}, function (err, response) {
    // console.log(response);
    if(response){
      Upload.find({id:response.id, course:url.parse(req.url).pathname.split("/")[2]}, function (err, respo) {
        //console.log(respo[0].course);
        if(response){
          	respo = respo;
          	var exam1 = [];
			var exam2 = [];
			var exam3 = [];
			var project = [];
          	for(var i=0;i<respo.length;i++){

				exam1[i] = respo[i].insem1;
				exam2[i] = respo[i].insem2;
				exam3[i] = respo[i].endsem;
				project[i] = respo[i].project;

          	}
          	console.log(exam1);
			var plotly = require('plotly')("saifee95","7r7c7796wh");

			var data = [
  			{
    			x: exam1,
    			type: "histogram"
  			}];

			var data2 = [
  			{
    			x: exam2,
    			type: "histogram"
  			}];

			var data3 = [
  			{
    			x: exam3,
    			type: "histogram"
  			}];

			var data4 = [
  			{
    			x: project,
    			type: "histogram"
  			}];

			var layout = {
  			title : 'Insem1 marks',
  			xaxis : {title : 'marks'}
			}

			var layout2 = {
  			title : 'Insem2 marks',
  			xaxis : {title : 'marks'}
			}

			var layout3 = {
  			title : 'endsem marks',
  			xaxis : {title : 'marks'}
			}

			var layout4 = {
  			title : 'project marks',
  			xaxis : {title : 'marks'}
			}

			var graphOptions = {layout : layout,filename: "basic-histogram", fileopt: "overwrite"};
			var graphOptions2 = {layout : layout2,filename: "second-histogram", fileopt: "overwrite"};
			var graphOptions3 = {layout : layout3,filename: "third-histogram", fileopt: "overwrite"};
			var graphOptions4 = {layout : layout4,filename: "fourth-histogram", fileopt: "overwrite"};

			plotly.plot(data, graphOptions, function (err, msg) {
    			console.log(msg);
			});

			plotly.plot(data2, graphOptions2, function (err, msg) {
    			console.log(msg);
			});

			plotly.plot(data3, graphOptions3, function (err, msg) {
    			console.log(msg);
			});

			plotly.plot(data4, graphOptions4, function (err, msg) {
    			console.log(msg);
			});

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
