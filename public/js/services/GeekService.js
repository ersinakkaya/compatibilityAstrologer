angular.module('GeekService', ['apiService']).factory('Geek', ['$http', 'api', '$rootScope', function($http, api, rootScope) {
	console.log("GeekService is initialized!");
	function getData(callback){
		console.log("getData is called in GeekService");
		// api.get('/index', {}, function(response){
		// 	rootScope.data = response.data;
		// 	console.log(response);
		// 	callback(response);
		// });	
	}
	return {
		getData: getData
	}
}]);