'use strict';

/**
 * @ngdoc function
 * @name iconicApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the iconicApp
 */
angular.module('iconicApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
