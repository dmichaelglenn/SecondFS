var app = angular.module("BandApp");

app.controller("LoginController", ["$scope", "HttpService" , function($scope, HttpService){
	$scope.testMessage = "(temporary) Please select your name to login";

	HttpService.getUsers.then(function(response) {
		$scope.usersList = response;
		console.log($scope.usersList);
	});
    $scope.userSelected = function(id) {
        console.log(id);
        HttpService.getOneUser(id).then(function(response) {
            $scope.currentUser = response;
            console.log($scope.currentUser);
        });
    };
}]);
