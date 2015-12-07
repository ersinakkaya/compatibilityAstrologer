app.controller('TypeController', ['$scope', '$location', 'api', function($scope, $location, api) {
	$scope.session_key = $location.search().session_key;
	if(typeof($scope.session_key) == 'undefined'){
		$location.path('/');
	}

	$scope.saveCollaborationType = function(type){
		api.post('/saveCollaborationType?session_key=' + $scope.session_key, {type: type}, function(response){
			if(response.success == true){
				$location.path('/birthday').search({session_key: $scope.session_key});
			}
		});
	}
}]);