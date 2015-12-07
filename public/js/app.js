var app = angular.module('compatibilityAstrologer', ['ngRoute', 'appRoutes', 'ApiService']);
var config = {
	base_url: 'http://127.0.0.1',
	port: 8080
}
app.constant('config', config);