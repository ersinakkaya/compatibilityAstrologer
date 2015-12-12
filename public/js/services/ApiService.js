angular.module('ApiService', [])
.factory("api", ['$rootScope', '$q', '$http', '$timeout', 'config', 
function ($rootScope, $q, $http, $timeout, $config) {
	var apiBaseUrl = $config.base_url + ":" + $config.port + "/api";
	$http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";

	function requestTransformer(data){
		if (data) return $.param(data);
	}

	function responseTransformer(response, continueOnError){
		if (!response) {
			$rootScope.alert({
				title: 'An error occured!',
				message: 'An error occurred. Try again! #E102'
			});
			return -1;
		}

		if (typeof response == 'string') {
			console.log(data);
			try {
				data = JSON.parse(response);
			} catch (e) {
				$rootScope.alert('JSON Response Error');
				return -1;
			}
		}
		else {
			data = response;
		}

		return data;
	}

	function handleError(response, status, headers, config) {
		if (response && response !== -1) {
			message = 'An error occurred. Try again! #103';
			if (typeof response['message'] == 'string') message = response.message;

			$rootScope.alert({
				title: 'Server Error!',
				message: message
			});
		}
	}

	function renderUrl(endpoint){
		url = apiBaseUrl + endpoint;

		url += (url.indexOf('?') === -1 ? '?' : '&');
		//console.log(url);
		return url;
	}

	function getMethod(endpoint, params, callback, continueOnError) {
		request = $http({
			url: renderUrl(endpoint),
			method: 'GET',
			transformRequest: requestTransformer,
			params: params
		})
		.success(function(data, status, headers, config) {
			response = responseTransformer(data, continueOnError);
			if (response !== -1 || continueOnError) {
				callback(response);
			}
		});

		if (continueOnError) {
			request.error(function(data, status, headers, config) {
				callback(data);
			});
		}
		else {
			request.error(handleError);
		}
	}

	function postMethod(endpoint, params, callback, continueOnError) {
		request = $http({
			url: renderUrl(endpoint),
			method: 'POST',
			transformRequest: requestTransformer,
			data: params
		})
		.success(function(data, status, headers, config) {
			response = responseTransformer(data, continueOnError);
			if (response !== -1 || continueOnError) {
				callback(response);
			}
		});

		if (continueOnError) {
			request.error(function(data, status, headers, config) {
				callback(data);
			});
		}
		else {
			request.error(handleError);
		}
	}

	function deleteMethod(endpoint, params, callback, continueOnError) {
		// Method overwrite for slim, send post request for
		params['_METHOD'] = 'DELETE';
		postMethod(endpoint, params, function(response){
			callback(response);
		}, continueOnError);
	}

	return {
		get: getMethod,
		post: postMethod,
		delete: deleteMethod
	};
}]);