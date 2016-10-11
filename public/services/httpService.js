angular.module('BandApp').service('HttpService', function($http) {

    this.getUsers = $http.get("http://localhost:8080/musicians").then(function(response) {
        return response.data;
    });
    this.getOneUser = function(id) {
        return $http.get("http://localhost:8080/musicians/" + id).then(function(response) {
            return response.data;
        });
    };
});
