(function(){
var app = angular.module('MyProfile', []);

app.controller('MyProfileController', [ '$scope','$http', function( $http ){

$http.get('https://da-profsite.herokuapp.com/MyProfile').success(function(data){
            $scope.products = data; //We need to initialize products
        });

$scope.submitdata = function(){
name = req.body.name;
email = req.body.email;
data = [name,email];
$http.post("https://da-profsite.herokuapp.com/MyProfile", data).success(function(data, status) {
            $scope.hello = data;
        })
} ] );}
})();
