angular.module("app", [
     'ngRoute',
    'ui.bootstrap',
	
	
])

.config([
    '$routeProvider',
    function ($routeProvider) {
        //console.log($routeProvider);
        $routeProvider
		
		.when('/:myProxy?', {
            templateUrl: 'Views/feed.html',
            controller: 'feedCtrl'
        })
		
	  // .otherwise({
		// templateUrl: 'Views/feed.html',
		// controller: 'feedCtrl'
	  // });
    }
]);
