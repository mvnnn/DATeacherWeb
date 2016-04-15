var http=require ('http');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose=require('mongoose');
var Cookies = require( "cookies" );
var port=process.env.PORT || 3000 ;
var dburl='mongodb://student:******@ds011389.mlab.com:11389/courseaid';
mongoose.connect(dburl);

var Home = require('./routes/private/Home');
var Authentication = require('./routes/private/Authentication');
var MyProfile = require('./routes/private/MyProfile');
var MyCourses = require('./routes/private/MyCourses');
// var Grade = require('./routes/private/Grade');
var Queries = require('./routes/private/Queries');
var Repository = require('./routes/private/Repository');
var Navbar = require('./routes/private/Navbar');


//CORS middleware
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, x-access-token');
    next();
}

var app = express();
var methodOverride = require('method-override');

app.use(logger('dev'));

app.use(allowCrossDomain);
app.set('view engine', 'ejs');
app.use(favicon(path.join('public','bb.ico')));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({limit: '50mb'}));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cookieParser());
// app.use(express.bodyParser({limit: '50mb'}));
// app.use( bodyParser.raw({limit: '1mb'}) );
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
app.get('/Forget', Authentication.forget);
app.post('/Forget', Authentication.postforget);
app.post('/SignUp', Authentication.signUpData);
app.get('/Home', Home.home);
app.get('/MyProfile', MyProfile.myProfile);
app.get('/MyCourses', MyCourses.myCourses);
app.get('/MyCourses/*/StudentHome', MyCourses.studentHome);
app.get('/MyCourses/*/StudentList', MyCourses.studentList);
app.post('/MyCourses/*/StudentList', MyCourses.postStudentList);
app.get('/MyCourses/*/SetCriteria', MyCourses.setCriteria);
app.post('/MyCourses/*/SetCriteria', MyCourses.saveSetCriteria);
app.get('/MyCourses/*/UploadMarks', MyCourses.uploadMarks);
app.post('/MyCourses/*/UploadMarks', MyCourses.setUploadMarks);
app.get('/MyCourses/*/StudentMarksList', MyCourses.StudentMarksList);
app.post('/MyCourses/*/StudentMarksList', MyCourses.UpdateStudentMarksList);
app.get('/MyCourses/*/PerformanceStates', MyCourses.performanceStates);
app.get('/MyCourses/*/GenGrades', MyCourses.genGrades);
app.post('/MyCourses/*/GenGrades', MyCourses.storeGrades);
app.get('/Broadcast', MyCourses.broadcast);
app.post('/Broadcast', MyCourses.postBroadcast);

app.get('/MyCourses/*/Queries', Queries.queires);
app.post('/MyCourses/*/Queries', Queries.postQueires);
app.get('/MyCourses/*/Repository', Repository.repository);
app.post('/MyCourses/*/Repository', Repository.delRepository);
app.get('/ChangePass', Navbar.changePass);
app.post('/ChangePass', Navbar.PostchangePass);
app.get('/Help', Navbar.help);
app.get('/Logout', Navbar.logout);
// app.get('/*', Authentication.authentication);


app.get('/*', Authentication.authentication);

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
