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

		.when('/skills', {
			templateUrl: 'views/skills.html',
			controller: 'SkillsController'
		})

		.when('/interests', {
			templateUrl: 'views/interests.html',
			controller: 'InterestsController'
		})

		.when('/experience', {
			templateUrl: 'views/experience.html',
			controller: 'ExperienceController'
		})

		.when('/education', {
			templateUrl: 'views/education.html',
			controller: 'EducationController'
		})

		.when('/commitment', {
			templateUrl: 'views/commitment.html',
			controller: 'CommitmentController'
		})

		.when('/result', {
			templateUrl: 'views/result.html',
			controller: 'ResultController'
		})

	$locationProvider.html5Mode(true);

}]);