angular.module('TypeService', []).factory('Type', ['$http', 'api', '$rootScope', function($http, api, rootScope) {
	console.log("TypeService");
	console.log(rootScope);
}]);