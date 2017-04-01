'use strict';

/**
 * @ngdoc function
 * @name iconicApp.controller:BykindCtrl
 * @description
 * # BykindCtrl
 * Controller of the iconicApp
 */
angular.module('iconicApp')
  .controller('BykindCtrl', function ($scope, $routeParams, sIconData) {
    $scope.kind = $routeParams.kind;
    
    $scope.coats = [];
    
    sIconData.icons.forEach(function(icon, i) {
      //console.debug([icon, i]);
      var schemeIndex = sIconData.findSchemeIndex(sIconData.attributedKinds[icon]);
      var scheme = sIconData.schemes[schemeIndex];
      if (scheme.name == $scope.kind) {
        var coat = {
          "icon": icon,
          "scheme": scheme,
        };
        $scope.coats.push(coat);
      }
    });
    
  });
