app.controller('SkillsController', ['$scope', '$location', 'api', function($scope, $location, api) {
	$scope.session_key = $location.search().session_key;
	if(typeof($scope.session_key) == 'undefined'){
		$location.path('/');
	}

	$scope.submit = function(){
		api.post('/saveSkills?session_key=' + $scope.session_key, this.formData, function(response){
			if(response.success == true){
				$location.path('/interests').search({session_key: $scope.session_key});
			}
		});
	}
}]);

app.controller('InterestsController', ['$scope', '$location', 'api', function($scope, $location, api) {
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

app.controller('ExperienceController', ['$scope', '$location', 'api', function($scope, $location, api) {
	$scope.session_key = $location.search().session_key;
	if(typeof($scope.session_key) == 'undefined'){
		$location.path('/');
	}

	$scope.submit = function(){
		api.post('/saveExperience?session_key=' + $scope.session_key, this.formData, function(response){
			if(response.success == true){
				$location.path('/result').search({session_key: $scope.session_key});
			}
		});
	}
}]);

//$location.path('/result').search({session_key: $scope.session_key});