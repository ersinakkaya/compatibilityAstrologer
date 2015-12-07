app.controller('GeekController', ['$scope', 'api', function($scope, api) {
	$scope.tagline = 'The square root of life is pi!';
	api.get('/index', {}, function(response){
		rootScope.data = response.data;
		console.log(response);
		callback(response);
	});
}]);