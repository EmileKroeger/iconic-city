'use strict';

/**
 * @ngdoc function
 * @name iconicApp.controller:FullcityCtrl
 * @description
 * # FullcityCtrl
 * Controller of the iconicApp
 */
angular.module('iconicApp')
  .controller('FullcityCtrl', function ($scope, sIconData, SBlasonMaker,
          sRandomUtils) {
    var byKind = sIconData.getByKind();
    var kindScheme = sRandomUtils.choose(sIconData.schemes);
    var schemes = SBlasonMaker.getAdaptedSchemes(kindScheme);
    var kind = kindScheme.name;
    var icons = byKind[kind];
    console.debug(kind);
    var icon = sRandomUtils.choose(icons);
    var scheme = sRandomUtils.choose(schemes);
    $scope.coat = {
      icon: icon,
      scheme: scheme,
      class: sRandomUtils.choose(SBlasonMaker.classes),
    };
  });
