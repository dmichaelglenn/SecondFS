angular.module('BandApp').service('HttpService', function($http) {


this.getUsers = $http.get("http://localhost:8080/musicians").then(function(response) {
        return response.data;
    });
});
