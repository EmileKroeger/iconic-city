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

    var schemeIndex = sIconData.findSchemeIndex($routeParams.kind);
    var scheme = sIconData.schemes[schemeIndex];
    
    var variants = [scheme];
    if (scheme.variants) {
      Array.prototype.push.apply(variants, scheme.variants);
    }
    console.debug(variants);
    
    $scope.coats = [];
    
    var iconNum = 0;
    
    sIconData.icons.forEach(function(icon, i) {
      //console.debug([icon, i]);
      if (sIconData.attributedKinds[icon] == $scope.kind) {
        var coat = {
          "icon": icon,
          "scheme": variants[iconNum],
        };
        $scope.coats.push(coat);
        iconNum = (iconNum + 1) % variants.length;
      }
    });
    
  });
