var app = angular.module('compatibilityAstrologer', ['ngRoute', 'appRoutes', 'ApiService','ui.bootstrap']);
pathArray = location.href.split( '/' );
domain    = pathArray[2].split(':');
var config = {
	base_url: pathArray[0] + '//' + domain[0],
	port: 5000
}
app.constant('config', config);