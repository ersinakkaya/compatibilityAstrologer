app.controller('MainController', ['$scope', '$location', 'api', function($scope, $location, api) {
	$scope.start = function() {
        api.get('/start', {}, function(response){
        	if(response.session_key){
        		$location.path('/type').search({session_key: response.session_key});
        	}
        	else{
        		$location.path('/');
        	}
			
		});
    }
}]);