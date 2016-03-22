angular.module("app").controller("feedCtrl", [
"$scope", "$route", "$routeParams","$window",  "$filter", "$sce", "feedSvc",  
    function ($scope, $route, $routeParams, $window, $filter, $sce, feedSvc) {
		
		//************onGlobalKeyDown***************************************
		//******************************************************************
		//****do: listener on key press event key press calls functions*****
		//******************************************************************
		
			
		var onGlobalKeyDown = function onGlobalKeyDown(event)
{			var UP = 38;
			
			var DOWN = 40;
			var ENTER = 13;
			var LEFT = 37;
			var RIGHT = 39;
			
			var keyCode = event.keyCode;
			var shiftKey = event.shiftKey;
			var ctrlKey = event.ctrlKey;

			if (keyCode == 13 /* F12 */ && !shiftKey)
			{
				
				$scope.watchVideo($scope.model.pageEntries[$scope.model.entry].link);
				
			}
			
			if (keyCode == LEFT /* F12 */ && !shiftKey)
			{
				$scope.movePage(true);
			}
			
			if (keyCode == RIGHT /* F12 */ && !shiftKey)
			{
				$scope.movePage(false);
			}
			
			if (keyCode == UP /* F12 */ && !shiftKey)
			{
				$scope.moveEntry(true);
			}
			
			if (keyCode == DOWN /* F12 */ && !shiftKey)
			{
				$scope.moveEntry(false);
			}
			
			
		};

       //************listenKeyboardActivation****************
		//***************************************************
		//****do: add listener on key press.*****************
		//***************************************************
		
		var listenKeyboardActivation = function()
		{
			
			window.addEventListener("keydown", onGlobalKeyDown);
			
			isListeningKeyboardActivation = true;
		};
        
		//************listenKeyboardActivation***************
		//***************************************************
		//****do: add listener on key press.*****************
		//***************************************************
		
		var stopListeningKeyboardActivation = function()
{
		
			if (isListeningKeyboardActivation)
			{
				window.removeEventListener("keydown", onGlobalKeyDown);
			}
		};
		
		//************printDate******************************
		//***************************************************
		//****do: format date from entry.********************
		//***************************************************
		$scope.printDate = function (publishedDate){
		
		return new Date(publishedDate).toString("dd/MM/yyyy HH:mm");
		
		}
        
		
		//************setPageEntries*************************
		//***************************************************
		//****do: Extract entries from Total Entries and insert 
		//********in the Page Entries.************************
		//***************************************************
		$scope.setPageEntries = function (page, entriesTotal) {
			 var entriesResult = [];
			  var start = ((page -1) * $scope.model.entriesXPage);
			  var end = (page * $scope.model.entriesXPage);
			  for(var i= start; i < end;i++){
					entriesResult.push(entriesTotal[i]);
			 }	
			 return  entriesResult;		
         };
		
		
		//************movePage********************************
		//****************************************************
		//****do: Move page right/left ***********************
		//****************************************************
		
		$scope.movePage = function (isLeft) {
			var move=false;
			
			if(isLeft & $scope.model.page > 1){ $scope.model.page--;move = true;}
			else if(!isLeft && $scope.model.page <= $scope.model.totalPages){ $scope.model.page++; move = true;}
			
			var totalEntries = $scope.model.myProxy? $scope.model.feed.item :$scope.model.feed.entries;
			
			
			if (move) $scope.model.pageEntries = $scope.setPageEntries($scope.model.page, totalEntries);
			 
			 $scope.$digest();
			 
			 return;
				
        };
		
		//************moveEntry*******************************
		//****************************************************
		//****do: Move entry up/down *************************
		//****************************************************
		
		$scope.moveEntry = function (isUp) {
			
			if(isUp & $scope.model.entry >= 1){ $scope.model.entry--;move = true;}
			else if(!isUp && $scope.model.entry <= $scope.model.entriesXPage-1){ $scope.model.entry++; move = true;}
			
			$scope.$digest();
			 
			 return;
				
        };
		
		//************getFeedRSS**************************************
		//****************************************************
		//****do: Move entry up/down *************************
		//****************************************************
		
        $scope.getFeedRSS = function () {
            
            feedSvc.getFeedRSS($scope.model.urlRSS, $scope.model.urlProxy).then(
                function (rsp) {
				
				
				if($scope.model.myProxy){
					$scope.model.feed = rsp.data.channel;
					$scope.model.pageEntries = $scope.setPageEntries(1, $scope.model.feed.item);
				}else{
					
					$scope.model.feed = rsp.data.responseData.feed;
					$scope.model.pageEntries = $scope.setPageEntries(1, $scope.model.feed.entries);
				}
				
                   
                },
                function (msg) {
                    window.alert('Error: getFeedRss ');
					
					
                }
             );
        };
		
		
		
		//************watchVideo**************************************
		//****************************************************
		//****do: on key enter watch selected video  *********
		//****************************************************
		
		$scope.watchVideo = function(link){
			$scope.model.iframeSrc = $sce.trustAsResourceUrl(link);
			
			$scope.$digest();
		}
		
		
		
		
		//Main
		$scope.model = {};
		$scope.model.myProxy = $routeParams.myProxy=="true"? true : false;
		$scope.submit = false;
		$scope.model.watch = "";
		$scope.model.urlRSS = "http://rss.cnn.com/rss/cnn_freevideo.rss";
		$scope.model.urlProxy = $scope.model.myProxy ? "http://localhost/proxy.php?url=": 
		"https://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=25&callback=JSON_CALLBACK&q=";
		
		
		//var for pagination
		$scope.model.page = 1;
		$scope.model.entriesXPage = 5;
		$scope.model.totalPages = 5;//8 for api google
		$scope.model.pageEntries = [];
		
		//var for entries
		$scope.model.entry = 0;
		
		//get rss feed
		$scope.getFeedRSS();
		var isListeningKeyboardActivation = false;
		
		//add listener on key press
		listenKeyboardActivation();
  
       
		
	  
		
	}
        
]);

