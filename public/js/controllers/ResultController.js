app.controller('ResultController', ['$scope', '$location', 'api', function($scope, $location, api) {
	$scope.session_key = $location.search().session_key;
	if(typeof($scope.session_key) == 'undefined'){
		$location.path('/');
	}

	api.get('/calculateScore?session_key=' + $scope.session_key, {}, function(response){
    	if(response.success){
    		$scope.result = response.score;
    	}
    	else{
    		$location.path('/');
    	}
	});
}]);