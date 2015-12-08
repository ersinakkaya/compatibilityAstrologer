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
				$location.path('/experience').search({session_key: $scope.session_key});
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
		var data = {
			user_experience: this.formData.user_experience,
			collaborator_experience: this.formData.collaborator_experience
		}

		api.post('/saveExperience?session_key=' + $scope.session_key, data, function(response){
			if(response.success == true){
				$location.path('/education').search({session_key: $scope.session_key});
			}
		});
	}
}]);

app.controller('EducationController', ['$scope', '$location', 'api', function($scope, $location, api) {
	$scope.session_key = $location.search().session_key;
	if(typeof($scope.session_key) == 'undefined'){
		$location.path('/');
	}

	$scope.submit = function(){
		var data = {
			user_degree: this.formData.user_degree,
			collaborator_degree: this.formData.collaborator_degree
		}

		api.post('/saveEducation?session_key=' + $scope.session_key, data, function(response){
			if(response.success == true){
				$location.path('/commitment').search({session_key: $scope.session_key});
			}
		});
	}
}]);

app.controller('CommitmentController', ['$scope', '$location', 'api', function($scope, $location, api) {
	$scope.session_key = $location.search().session_key;
	if(typeof($scope.session_key) == 'undefined'){
		$location.path('/');
	}

	$scope.submit = function(){
		var data = {
			user_commitment: this.formData.user_commitment,
			collaborator_commitment: this.formData.collaborator_commitment
		}

		api.post('/saveCommitment?session_key=' + $scope.session_key, data, function(response){
			if(response.success == true){
				$location.path('/result').search({session_key: $scope.session_key});
			}
		});
	}
}]);