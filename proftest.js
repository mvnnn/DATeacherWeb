var chai = require('chai');
var superagent = require('superagent');
var chaiHttp = require('chai-http');
var server = require('./app');
var Home = require('./routes/private/Home');
var MyCourses = require('./routes/private/MyCourses');
var Authentication= require('./routes/private/Authentication');
var MyProfile= require('./routes/private/MyProfile');
var Navbar= require('./routes/private/Navbar');
var Queries = require('./routes/private/Queires');
var Repository = require('./routes/private/Repository');
var should = chai.should();
chai.use(chaiHttp);

describe('Home', function(){
  it('should respond to GET',function(done){
  	this.timeout(15000);
    superagent
      .get('https://da-profsite.herokuapp.com/Home')
      .end(function(err,res){
      	//console.log(res);
        res.should.have.status(200);
        done();
  });
});
});

describe('MyCourses', function(){
  it('should respond to GET',function(done){
  	this.timeout(15000);
    superagent
      .get('https://da-profsite.herokuapp.com/MyCourses')
      .end(function(err,res){
      	////console.log(res);
        res.should.have.status(200);
        done();
  });
});
});

describe('Authentication', function(){
  it('should respond to GET',function(done){
    this.timeout(15000);
    superagent
      .get('https://da-profsite.herokuapp.com/Authentication')
      .end(function(err,res){
        // //console.log(res);
        res.should.have.status(200);
        done();
  });
});
});
describe('MyProfile', function(){
  it('should respond to GET',function(done){
    this.timeout(15000);
    superagent
      .get('https://da-profsite.herokuapp.com/MyProfile')
      .end(function(err,res){
        //console.log(res);
        res.should.have.status(200);
        done();
  });
});
});
describe('Navbar', function(){
  it('should respond to GET',function(done){
    this.timeout(15000);
    superagent
      .get('https://da-profsite.herokuapp.com/Navbar')
      .end(function(err,res){
        //console.log(res);
        res.should.have.status(200);
        done();
  });
});
});
describe('Queries', function(){
  it('should respond to GET',function(done){
    this.timeout(15000);
    superagent
      .get('https://da-profsite.herokuapp.com/Queires')
      .end(function(err,res){
        //console.log(res);
        res.should.have.status(200);
        done();
  });
});
});
describe('Repository', function(){
  it('should respond to GET',function(done){
    this.timeout(15000);
    superagent
      .get('https://da-profsite.herokuapp.com/Repository')
      .end(function(err,res){
        //console.log(res);
        res.should.have.status(200);
        done();
  });
});
});
describe('ChangePass', function(){
  it('should respond to GET',function(done){
    this.timeout(15000);
    superagent
      .get('https://da-profsite.herokuapp.com/ChangePass')
      .end(function(err,res){
        //console.log(res);
        res.should.have.status(200);
        done();
  });
});
});
describe('Help', function(){
  it('should respond to GET',function(done){
    this.timeout(15000);
    superagent
      .get('https://da-profsite.herokuapp.com/Help')
      .end(function(err,res){
        //console.log(res);
        res.should.have.status(200);
        done();
  });
});
});

describe('EL203', function(){
  it('should respond to GET',function(done){
    this.timeout(15000);
    superagent
      .get('https://da-profsite.herokuapp.com/MyCourses/EL203/StudentHome')
      .end(function(err,res){
        //console.log(res);
        res.should.have.status(200);
        done();
  });
});
});


describe('EL203 StudentList', function(){
  it('should respond to GET',function(done){
    this.timeout(15000);
    superagent
      .get('https://da-profsite.herokuapp.com/MyCourses/EL203/StudentList')
      .end(function(err,res){
        //console.log(res);
        res.should.have.status(200);
        done();
  });
});
});
describe('EL203 SetCriteria', function(){
  it('should respond to GET',function(done){
    this.timeout(15000);
    superagent
      .get('https://da-profsite.herokuapp.com/MyCourses/EL203/SetCriteria')
      .end(function(err,res){
        //console.log(res);
        res.should.have.status(200);
        done();
  });
});
});
describe('EL203 UploadMarks', function(){
  it('should respond to GET',function(done){
    this.timeout(15000);
    superagent
      .get('https://da-profsite.herokuapp.com/MyCourses/EL203/UploadMarks')
      .end(function(err,res){
        //console.log(res);
        res.should.have.status(200);
        done();
  });
});
});
describe('EL203 StudentMarksList', function(){
  it('should respond to GET',function(done){
    this.timeout(15000);
    superagent
      .get('https://da-profsite.herokuapp.com/MyCourses/EL203/StudentMarksList')
      .end(function(err,res){
        //console.log(res);
        res.should.have.status(200);
        done();
  });
});
});
describe('EL203 PerformanceStates', function(){
  it('should respond to GET',function(done){
    this.timeout(15000);
    superagent
      .get('https://da-profsite.herokuapp.com/MyCourses/EL203/PerformanceStates')
      .end(function(err,res){
        //console.log(res);
        res.should.have.status(200);
        done();
  });
});
});

describe('EL203 GenGrades', function(){
  it('should respond to GET',function(done){
    this.timeout(15000);
    superagent
      .get('https://da-profsite.herokuapp.com/MyCourses/EL203/GenGrades')
      .end(function(err,res){
        //console.log(res);
        res.should.have.status(200);
        done();
  });
});
});
describe('EL203 Broadcast', function(){
  it('should respond to GET',function(done){
    this.timeout(15000);
    superagent
      .get('https://da-profsite.herokuapp.com/MyCourses/EL203/Broadcast')
      .end(function(err,res){
        //console.log(res);
        res.should.have.status(200);
        done();
  });
});
});
describe('EL203 Broadcast', function(){
  it('should respond to GET',function(done){
    this.timeout(15000);
    superagent
      .get('https://da-profsite.herokuapp.com/MyCourses/EL203/Broadcast')
      .end(function(err,res){
        //console.log(res);
        res.should.have.status(200);
        done();
  });
});
});
describe('SC210', function(){
  it('should respond to GET',function(done){
    this.timeout(15000);
    superagent
      .get('https://da-profsite.herokuapp.com/MyCourses/SC210/StudentHome')
      .end(function(err,res){
        //console.log(res);
        res.should.have.status(200);
        done();
  });
});
});
describe('SC210 StudentList', function(){
  it('should respond to GET',function(done){
    this.timeout(15000);
    superagent
      .get('https://da-profsite.herokuapp.com/MyCourses/SC210/StudentList')
      .end(function(err,res){
        //console.log(res);
        res.should.have.status(200);
        done();
  });
});
});
describe('SC210 SetCriteria', function(){
  it('should respond to GET',function(done){
    this.timeout(15000);
    superagent
      .get('https://da-profsite.herokuapp.com/MyCourses/SC210/SetCriteria')
      .end(function(err,res){
        //console.log(res);
        res.should.have.status(200);
        done();
  });
});
});
describe('SC210 UploadMarks', function(){
  it('should respond to GET',function(done){
    this.timeout(15000);
    superagent
      .get('https://da-profsite.herokuapp.com/MyCourses/SC210/UploadMarks')
      .end(function(err,res){
        //console.log(res);
        res.should.have.status(200);
        done();
  });
});
});
describe('SC210 StudentMarksList', function(){
  it('should respond to GET',function(done){
    this.timeout(15000);
    superagent
      .get('https://da-profsite.herokuapp.com/MyCourses/SC210/StudentMarksList')
      .end(function(err,res){
        // //console.log(res);
        res.should.have.status(200);
        done();
  });
});
});
describe('SC210 PerformanceStates', function(){
  it('should respond to GET',function(done){
    this.timeout(15000);
    superagent
      .get('https://da-profsite.herokuapp.com/MyCourses/SC210/PerformanceStates')
      .end(function(err,res){
        // //console.log(res);
        res.should.have.status(200);
        done();
  });
});
});

describe('SC210 GenGrades', function(){
  it('should respond to GET',function(done){
    this.timeout(15000);
    superagent
      .get('https://da-profsite.herokuapp.com/MyCourses/SC210/GenGrades')
      .end(function(err,res){
        // //console.log(res);
        res.should.have.status(200);
        done();
  });
});
});
describe('SC210 Broadcast', function(){
  it('should respond to GET',function(done){
    this.timeout(15000);
    superagent
      .get('https://da-profsite.herokuapp.com/MyCourses/SC210/Broadcast')
      .end(function(err,res){
        // //console.log(res);
        res.should.have.status(200);
        done();
  });
});
});
describe('SC210 Broadcast', function(){
  it('should respond to GET',function(done){
    this.timeout(15000);
    superagent
      .get('https://da-profsite.herokuapp.com/MyCourses/SC210/Broadcast')
      .end(function(err,res){
        // //console.log(res);
        res.should.have.status(200);
        done();
  });
});
});