app.controller('BirthdayController', ['$scope', '$location', 'api', function($scope, $location, api) {
	$scope.session_key = $location.search().session_key;
	if(typeof($scope.session_key) == 'undefined'){
		$location.path('/');
	}

	$scope.submit = function(){
        var data = {
          	user_birthday: this.user_birthday,
          	user_sex: this.user_sex,
          	collaborator_birthday: this.collaborator_birthday,
          	collaborator_sex: this.collaborator_sex
         };
        console.log(data);
		api.post('/saveBirthday?session_key=' + $scope.session_key, data, function(response){
			if(response.success == true){
				$location.path('/skills').search({session_key: $scope.session_key});
			}
		});
	}
}]);