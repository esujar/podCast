
angular.module('app').factory("feedSvc", [
    "$http",  
function ($http) {
        return {
           
            // ===============vv SPCALL  vv=================================================
			
			'getFeedRSS': function (rssURL, proxyURL) {
                
				return $http.jsonp(proxyURL+ encodeURIComponent(rssURL));				
				
				
            },
			
          
			
        };
    }
]);

