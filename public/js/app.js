var app = angular.module('compatibilityAstrologer', ['ngRoute', 'appRoutes', 'ApiService','ui.bootstrap']);
var config = {
	base_url: 'http://127.0.0.1',
	port: 5000
}
app.constant('config', config);