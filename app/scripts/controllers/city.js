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
  .service('SColorScheme', function() {
    function ColorScheme(colors) {
      var tagColors = {};
      var classColors = {};
      angular.forEach(colors, function(color, selector) {
        if (selector[0] === '.') {
          classColors[selector.slice(1)] = color;
        } else {
          tagColors[selector] = color;
        }
      });
      this.tagColors = tagColors;
      this.classColors = classColors;
    }
    ColorScheme.prototype.apply = function(dynamicSvg) {
      angular.forEach(this.tagColors, function(color, tag) {
        dynamicSvg.setTagColor(tag, color);
      });
      angular.forEach(this.classColors, function(color, cls) {
        dynamicSvg.setClassColor(cls, color);
      });
    };
    return ColorScheme;
  })
  .service('SDynamicSvg', function() {
    var count = 0;
    function DynamicSvg(name, scheme) {
      this.url = 'images/' + name + '.svg';
      this.scheme = scheme;
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
      this.scheme.apply(this);
    };
    return DynamicSvg;
  })
  .controller('CityCtrl', function ($scope, SDynamicSvg, SColorScheme) {
    var red = new SColorScheme({
      'path': 'red',
    });
    var blueWhite = new SColorScheme({
      '.wall': 'white',
      '.feature': 'blue',
      '.roof': 'darkblue',
    });
    $scope.dynamicSvgs = [
      new SDynamicSvg('icons/chess-queen', red),
      new SDynamicSvg('parts/tower1o', blueWhite),
      new SDynamicSvg('parts/house1o', blueWhite),
    ];
  });
