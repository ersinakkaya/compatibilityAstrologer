app.controller('ResultController', ['$scope', '$location', 'api', function($scope, $location, api) {
	$scope.session_key = $location.search().session_key;
	if(typeof($scope.session_key) == 'undefined'){
		$location.path('/');
	}
	$scope.result = Math.floor((Math.random() * 51)) + 50;
}]);