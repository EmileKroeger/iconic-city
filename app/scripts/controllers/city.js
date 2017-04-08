'use strict';

/**
 * @ngdoc function
 * @name iconicApp.controller:CityCtrl
 * @description
 * # CityCtrl
 * Controller of the iconicApp
 */
angular.module('iconicApp')
  .directive('onLoaded', function( $parse ) {
     return {
         restrict: 'A',
         link: function( $scope, elem, attrs ) {
           elem.bind('load', function() {
               var func = $parse(attrs.onLoaded);
               func($scope);
           });
         }
      };
  })
  .service('SDynamicSvg', function() {
    var count = 0;
    function DynamicSvg(name, colors) {
      this.url = 'images/' + name + '.svg';
      this.color = colors['.feature'];
      this.id = 'dsvg' + count;
      count += 1;
    }
    DynamicSvg.prototype.setTagColor = function(tag, color) {
      // Helper: color one kind of tag
      var elements = this.svgDoc.getElementsByTagName(tag);
      for (var i=0; i<elements.length; i++) {
        elements[i].setAttribute('fill', color);
      }
    };
    DynamicSvg.prototype.setClassColor = function(cls, color) {
      // Helper: color one class
      var elements = this.svgDoc.getElementsByClassName(cls);
      for (var i=0; i<elements.length; i++) {
        elements[i].setAttribute('fill', color);
      }
    };
    DynamicSvg.prototype.loaded = function() {
      // Callback when an elemnt is loaded
      this.svgDoc = document.getElementById(this.id).contentDocument;
      this.setTagColor('path', this.color);
      this.setClassColor('feature', this.color);
      this.setClassColor('wall', 'white');
    };
    return DynamicSvg;
  })
  .controller('CityCtrl', function ($scope, SDynamicSvg) {
    $scope.dynamicSvgs = [
      //new SDynamicSvg('icons/chess-queen', {'green'),
      //new SDynamicSvg('icons/chess-queen', 'red'),
      new SDynamicSvg('parts/tower1o', {
        '.feature': 'blue',
        '.wall': 'white',
      }),
    ];
  });
