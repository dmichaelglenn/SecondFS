var app = angular.module("BandApp");

app.controller("MainController", ["$scope", "HttpService", function($scope, HttpService){
	$scope.testMessage = "this is the home page";

	HttpService.getUsers.then(function(response) {
		$scope.usersList = response;
		console.log($scope.usersList);
	});
}]);
