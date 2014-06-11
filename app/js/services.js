'use strict';

/* Services */


//stores the path to the resource from the flightradar RESTful server.  
var FR24Services = angular.module('FR24Services', ['ngResource']);

FR24Services.factory('Data', function(){
    return {
        server_path: 'http://db8.flightradar24.com/zones'
    };
});


//gets the resource: all current flights all over the europe. 
FR24Services.factory('airplanes0', ['$resource', 'Data', '$rootScope',
	function($resource, Data, $rootScope){
  
		return{
		
			getResource:

				function(){
				
					var src = $resource(Data.server_path+'/:flightRegion.json', {flightRegion:'@id'}, {
										query: {method:'GET', params:{flightRegion:'europe_all'}, isArray:false}
							  });//gets the resource
								
					//checks the connection to the server
					var europe = src.get({flightRegion: 'europe_all'}, 
						function(){
							//if($rootScope.cond==true)
								alert('The connection to the server was established.');
								$rootScope.cond=true;
						},//succ. callback
						function(){
							$rootScope.cond = false;
							//alert('FAILED TO CONNECT TO THE SERVER!  try again latter.');
						}//fail callback
					);
					
					return src;
				},
				
		}
	
}]);//airplanes0


/********
The tasks of airplanes server are:
1. Sends a request to airplanes0 to get the resource from the server, 
   then Updates the current data with the data that was just received (by doing that under the hood).
2. Creates deferred object, resolved (if airplanes0 succeeded to connect to the server) or reject (if airplanes0 failed to connect to the server) it.
3. Returns deferred object with a promise property to the flightsListCtrl.
********/   
FR24Services.factory('airplanes', ['$q', '$timeout', '$resource', 'airplanes0','serviceGetterSetter', '$rootScope',
	function($q, $timeout, $resource, airplanes0, serviceGetterSetter, $rootScope){
	
		var getMessages = 
		
			function() {
				
				var deferred = $q.defer();	
				alert('You are about to reload DB..');
				serviceGetterSetter.set(airplanes0.getResource().query());	
				//timeout needed to allow .cond to be changed to proper value in airplanes0. 
				$timeout(function(){
					if ($rootScope.cond==true){
						deferred.resolve('You will see the current flights in a moment.');
					}
					else			
						deferred.reject(new Error('The reconnection has failed.. try again letter') );
				},2000);
		
				return deferred.promise;
			}; 
	
		return { 
			getMessages: getMessages
		}
}]);//airplanes
  
  
//getter and the setter of the app.  
FR24Services.factory('serviceGetterSetter', ['$rootScope','airplanes0', 
	function ($rootScope, airplanes0) {
	var inData = {}; 
	
	//
	return{	
		//restores the current data base
		get: function(){
			return inData;
		},
		//stores the current data base
		set: function(value){
			inData=value;
		}
	}
}]);
		
	