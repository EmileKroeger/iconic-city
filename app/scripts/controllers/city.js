'use strict';

/**
 * @ngdoc function
 * @name iconicApp.controller:CityCtrl
 * @description
 * # CityCtrl
 * Controller of the iconicApp
 */
angular.module('iconicApp')
.directive( 'elemReady', function( $parse ) {
   return {
       restrict: 'A',
       link: function( $scope, elem, attrs ) {
         elem.bind('load', function() {
             var func = $parse(attrs.elemReady);
             func($scope, elem);
         });
       }
    };
})
  .service('sDynamicSvg', function() {
    var count = 0;
    function DynamicSvg(name, color) {
      this.url = 'images/' + name + '.svg';
      this.color = color;
      this.id = 'dsvg' + count;
      count += 1;
    }
    DynamicSvg.prototype.loaded = function(scope, elem) {
      this.svgDoc = document.getElementById(this.id).contentDocument;
      //console.debug(this.svgDoc);
      //window.svgDoc = this.svgDoc;
      var path = this.svgDoc.getElementsByTagName('path')[0];
      if (path) {
        path.setAttribute('fill', this.color);
      } else {
        console.log("Warning: couldn't find element in " + this.url);
      }
      var features = this.svgDoc.getElementsByClassName('feature');
      console.debug(features);
      for (var i=0; i<features.length; i++) {
        var feature = features[i];
        feature.setAttribute('fill', this.color);
      }
      //features.forEach(function(feature) {
      //})
    };
    return DynamicSvg;
  })
  .controller('CityCtrl', function ($scope, sDynamicSvg) {
    $scope.dynamicSvgs = [
      new sDynamicSvg('icons/chess-queen', 'green'),
      new sDynamicSvg('icons/chess-queen', 'red'),
      new sDynamicSvg('parts/tower1o', 'blue'),
    ];
  });
