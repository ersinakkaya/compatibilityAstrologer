app.controller('QuestionsController', ['$scope', '$location', 'api', function($scope, $location, api) {
	$scope.session_key = $location.search().session_key;
	if(typeof($scope.session_key) == 'undefined'){
		$location.path('/');
	}

	$scope.submit = function(){
		api.post('/saveInterests?session_key=' + $scope.session_key, this.formData, function(response){
			if(response.success == true){
				$location.path('/result').search({session_key: $scope.session_key});
			}
		});
	}
}]);