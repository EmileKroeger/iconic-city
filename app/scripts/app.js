'use strict';

/**
 * @ngdoc overview
 * @name iconicApp
 * @description
 * # iconicApp
 *
 * Main module of the application.
 */
angular
  .module('iconicApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/icons', {
        templateUrl: 'views/icons.html',
        controller: 'IconsCtrl'
      })
      .when('/bykind/:kind', {
        templateUrl: 'views/bykind.html',
        controller: 'BykindCtrl'
      })
      .when('/flag', {
        templateUrl: 'views/flag.html',
        controller: 'FlagCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
