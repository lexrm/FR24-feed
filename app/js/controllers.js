'use strict';

/* Controllers */


var FR24Controllers = angular.module('FR24Controllers', []);

/*********
Has function, which activates when the "Click me" button is pushed,
that getting message from the deferred object and acts in according to that message.
********/
FR24Controllers.controller('flightsListCtrl', ['$scope', 'airplanes', 'airplanes0', 'serviceGetterSetter', '$rootScope', '$interval',
	function($scope, airplanes, airplanes0, serviceGetterSetter, $rootScope, $interval) {
	
		//initiates the flag for airplanes (to deferr or reject obj.),
		//for the edge case where setted timeout interval in airplanes's server func. was not enough (the connection to the server took longer than usual)
		$rootScope.cond = true;
		
		$scope.test = $interval(function(){
			//promise property, represents the promise of the task
			var promise = airplanes.getMessages(); //gets deferred.promise object that represents the task	
			promise.then(function(message){  //onSuccess func. - the object was resolved, 
							alert('DB updated. ' + message);
							$scope.airplanes = serviceGetterSetter.get();
						}, function(reason){ //onFail func. - the object was rejected
							alert(reason);
						   }
			);//promise
		}//test
		,10000);
		
}]);//flightDetailCtrl
 
//for future needs
FR24Controllers.controller('flightDetailCtrl', ['$scope', '$routeParams', 'airplanes',
  function($scope, $routeParams, airplanes) {
  }]);

