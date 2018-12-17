myApp.factory('listFactory', function($http, $log) {
	var factory = {};
	
	factory.getBusinessList = function(businessId) {
		$log.info("Loading businesses");
		return $http.get(Config.API_URL+'/businesses');
	}
	
	return factory;
});

myApp.controller('listController', ['listFactory', '$log', '$scope', function(listFactory, $log, $scope) {
	
	$log.debug("Fetching list");
	
	listFactory.getBusinessList().then(function(page) {
		$log.debug("Data received for businesses ", page.data);
		$scope.businessList = page.data._embedded.businesses;
	});
}]);