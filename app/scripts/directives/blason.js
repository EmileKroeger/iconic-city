'use strict';

/**
 * @ngdoc directive
 * @name iconicApp.directive:blason
 * @description
 * # blason
 */
angular.module('iconicApp')
  .directive('blason', function () {
    return {
      templateUrl: 'directives/blason.html',
      restrict: 'E',
      scope: { content: '='},       
      link: function postLink(scope, element, attrs) {
        //element.text('this is the new blason directive');
      }
    };
  });
