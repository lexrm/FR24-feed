'use strict';

/* App Module */

var FR24App = angular.module('FR24App', [
  'ngRoute',
  'FR24Controllers',
  'FR24Services'
]);

FR24App.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/planes', {
        templateUrl: 'partials/flights-list.html',
        controller: 'flightsListCtrl'
      }).
	  
      when('/planes/:planeId', {
        templateUrl: 'partials/flight-detail.html',
        controller: 'flightDetailCtrl'
      }).
      otherwise({
        redirectTo: '/planes'
      });
  }]);
