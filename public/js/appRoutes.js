angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

	$routeProvider

		// home page
		.when('/', {
			templateUrl: 'views/home.html',
			controller: 'MainController'
		})

		.when('/type', {
			templateUrl: 'views/type.html',
			controller: 'TypeController'
		})

		.when('/birthday', {
			templateUrl: 'views/birthday.html',
			controller: 'BirthdayController'
		})

		.when('/questions', {
			templateUrl: 'views/questions.html',
			controller: 'QuestionsController'
		})

		.when('/result', {
			templateUrl: 'views/result.html',
			controller: 'ResultController'
		})

	$locationProvider.html5Mode(true);

}]);