var app = angular.module("BandApp", ["ngRoute"]);


app.config(function ($routeProvider) {
	$routeProvider
	.when("/", {
		templateUrl: "templates/home.html",
		controller: "MainController"
	})

	.otherwise("/", {
		templateUrl: "templates/home.html",
		controller: "MainController"
	});
});
