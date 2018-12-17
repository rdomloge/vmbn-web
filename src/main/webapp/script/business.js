myApp.factory('businessFactory', function($http, $log) {
	var factory = {};
	
	factory.getBusiness = function(businessId) {
		$log.info("Loading business "+businessId);
		return $http.get(Config.API_URL+'/businesses/'+businessId);
	}
	
	factory.getGallery = function(businessId) {
		$log.info("Loading gallery "+businessId);
		return $http.get(Config.API_URL+'/businesses/'+businessId+"/images");
	}
	
	return factory;
});

myApp.controller('businessController', ['$routeParams', 'businessFactory', '$log', '$scope', function($routeParams, businessFactory, $log, $scope) {
	
	var businessId = $routeParams.businessId;
	
	$log.debug("Fetching business "+businessId);
	businessFactory.getBusiness(businessId).then(function(page) {
		$log.debug("Data received for business "+businessId, page.data);
		$scope.business = page.data;
	});
	
	businessFactory.getGallery(businessId).then(function(page) {
		$log.debug("Data received for gallery "+businessId, page.data);
		$scope.gallery = page.data;
	});
}]);