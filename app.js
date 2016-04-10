var http=require ('http');
var port=process.env.PORT || 3000 ;
var express = require('express');
var path = require('path');
var aws = require('aws-sdk');
var favicon = require('serve-favicon');
var logger = require('morgan');
var jwt    = require('jsonwebtoken');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose=require('mongoose');
var Cookies = require( "cookies" );
var dburl='mongodb://student:senteam15@ds011389.mlab.com:11389/courseaid';
mongoose.connect(dburl);

var Home = require('./routes/private/Home');
var Authentication = require('./routes/private/Authentication');
var MyProfile = require('./routes/private/MyProfile');
var MyCourses = require('./routes/private/MyCourses');
// var Grade = require('./routes/private/Grade');
var Queires = require('./routes/private/Queires');
var Repository = require('./routes/private/Repository');
var Navbar = require('./routes/private/Navbar');


//CORS middleware
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, x-access-token');
    next();
}

 /* Load the S3 information from the environment variables.*/
var AWS_ACCESS_KEY = process.env.AWS_ACCESS_KEY || 'AKIAI5JTL3SEIS2LER7Q';
var AWS_SECRET_KEY = process.env.AWS_SECRET_KEY || '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';
var S3_BUCKET = process.env.S3_BUCKET || 'studmarks';

var app = express();
var methodOverride = require('method-override');

app.use(logger('dev'));

app.use(allowCrossDomain);
app.set('view engine', 'ejs');
app.use(favicon(path.join('public','bb.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cookieParser());
var methodOverride = require('method-override');
app.use(express.static(path.join(__dirname, 'public')));

app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);

app.set('x-powered-by',false);

// private routes
app.get('/', Authentication.authentication);
app.get('/Authentication', Navbar.logout);
app.get('/Login', Authentication.login);
app.post('/Login', Authentication.loginAuth);
app.get('/SignUp', Authentication.signUp);
app.post('/SignUp', Authentication.signUpData);
app.get('/Home', Home.home);
app.get('/MyProfile', MyProfile.myProfile);
app.get('/MyCourses', MyCourses.myCourses);
app.get('/MyCourses/*/StudentHome', MyCourses.studentHome);
app.get('/MyCourses/*/StudentList', MyCourses.studentList);
app.get('/MyCourses/*/SetCriteria', MyCourses.setCriteria);
app.post('/MyCourses/*/SetCriteria', MyCourses.saveSetCriteria);
app.get('/MyCourses/*/UploadMarks', MyCourses.uploadMarks);
app.get('/MyCourses/*/UploadMarks', function(req, res){
    //res.sendFile('account.html');
    res.sendFile(path.join(__dirname, './public', './views/UploadMarks'));
});
app.post('/MyCourses/*/UploadMarks', MyCourses.setUploadMarks);
app.get('/MyCourses/*/PerformanceStates', MyCourses.performanceStates);
app.get('/MyCourses/*/GenGrades', MyCourses.genGrades);
app.post('/MyCourses/*/GenGrades', MyCourses.storeGrades);
app.get('/MyCourses/*/Broadcast', MyCourses.broadcast);

app.get('/Queires', Queires.queires);
app.get('/Repository', Repository.repository);
app.get('/ChangePass', Navbar.changePass);
app.get('/Help', Navbar.help);
// app.get('/Logout', Navbar.logout);
// app.get('/*', Authentication.authentication);



app.get('/sign_s3', function(req, res){
    aws.config.update({accessKeyId: AWS_ACCESS_KEY , secretAccessKey: AWS_SECRET_KEY });
    var s3 = new aws.S3();
    var s3_params = {
        Bucket: S3_BUCKET,
        Key: req.query.file_name,
        Expires: 60,
        ContentType: req.query.file_type,
        ACL: 'public-read'
    };
    s3.getSignedUrl('putObject', s3_params, function(err, data){
        if(err){
            console.log(err);
        }
        else{
            var return_data = {
                signed_request: data,
                url: 'https://'+S3_BUCKET+'.s3.amazonaws.com/'+req.query.file_name
                //console.log(url);
            };
            console.log(data);
            res.setHeader("access-control-allow-origin", "*");
            res.write(JSON.stringify(return_data));
            res.end();
        }
    });
});


//catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
// no stacktraces leaked to user unless in development environment
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    response: 'error',
    message: err.message,
    data: (app.get('env') === 'development') ? err : {}
  });
});

http.createServer(app).listen(port);
console.log('port listen at :'+ Number(port));




/*
 Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at
 http://www.apache.org/licenses/LICENSE-2.0
 Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
*/


/*
 * Import required packages.
 * Packages should be installed with "npm install".
 */
// var express = require('express');
// var http = require('http');
// var path = require('path');
// var aws = require('aws-sdk');
//
// /*
//  * Set-up the Express app.
//  */
// var app = express();
// app.set('views', __dirname + '/views');
// app.engine('html', require('ejs').renderFile);
// app.set('port', process.env.PORT || 3000);
// app.use(express.static(path.join(__dirname, 'public')));
//
// /*
//  * Load the S3 information from the environment variables.
//  */
// var AWS_ACCESS_KEY = process.env.AWS_ACCESS_KEY || 'AKIAI5JTL3SEIS2LER7Q';
// var AWS_SECRET_KEY = process.env.AWS_SECRET_KEY || '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';
// var S3_BUCKET = process.env.S3_BUCKET || 'studmarks';
//
// /*
//  * Respond to GET requests to /account.
//  * Upon request, render the 'account.html' web page in views/ directory.
//  */
// app.get('/account', function(req, res){
//     res.render('account.html');
// });
//
// app.get('/account', function(req, res){
//     //res.sendFile('account.html');
//     res.sendFile(path.join(__dirname, './public', 'account.html'));
// });
//
// /*
//  * Respond to GET requests to /sign_s3.
//  * Upon request, return JSON containing the temporarily-signed S3 request and the
//  * anticipated URL of the image.
//  */
// app.get('/sign_s3', function(req, res){
//     aws.config.update({accessKeyId: AWS_ACCESS_KEY , secretAccessKey: AWS_SECRET_KEY });
//     var s3 = new aws.S3();
//     var s3_params = {
//         Bucket: S3_BUCKET,
//         Key: req.query.file_name,
//         Expires: 60,
//         ContentType: req.query.file_type,
//         ACL: 'public-read'
//     };
//     s3.getSignedUrl('putObject', s3_params, function(err, data){
//         if(err){
//             console.log(err);
//         }
//         else{
//             var return_data = {
//                 signed_request: data,
//                 url: 'https://'+S3_BUCKET+'.s3.amazonaws.com/'+req.query.file_name
//                 //console.log(url);
//             };
//             console.log(data);
//             res.setHeader("access-control-allow-origin", "*");
//             res.write(JSON.stringify(return_data));
//             res.end();
//         }
//     });
// });
//
// /*
//  * Respond to POST requests to /submit_form.
//  * This function needs to be completed to handle the information in
//  * a way that suits your application.
//  */
// app.post('/submit_form', function(req, res){
//     // username = req.body.username;
//     // full_name = req.body.full_name;
//     // avatar_url = req.body.avatar_url;
//     // update_account(avatar_url); // TODO: create this function
//     // TODO: Return something useful or redirect
//     res.render('account.html');
// });
//
// /*
//  * Start the server to handle incoming requests.
//  */
// app.listen(app.get('port'));
