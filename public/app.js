var app = angular.module("BandApp", ["ngRoute"]);


app.config(function ($routeProvider) {
	$routeProvider
	.when("/", {
		templateUrl: "templates/home.html",
		controller: "MainController"
	})
	.when("/login", {
		templateUrl: "templates/userLogin.html",
		controller: "LoginController"
	})

	.otherwise("/", {
		templateUrl: "templates/home.html",
		controller: "MainController"
	});
});
