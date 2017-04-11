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
    function DynamicSvg(name, scheme, pos) {
      this.url = 'images/' + name + '.svg';
      this.scheme = scheme;
      this.id = 'dsvg' + count;
      count += 1;
      if(!pos) {
        pos = {};
      }
      if (!pos.wid) {
        pos.wid = 100;
      }
      if (!pos.x) {
        pos.x = 10;
      }
      if (!pos.y) {
        pos.y = 10;
      }
      this.style = {
        width: pos.wid + 'px',
        bottom: pos.y + 'px',
        left: pos.x + 'px',
      };
      //console.debug(this.style);
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
      /*
      new SDynamicSvg('icons/chess-queen', red, {
        x: 200,
      }),
      new SDynamicSvg('parts/tower1o', blueWhite, {
        x: 30,
        wid: 200,
      }),
      new SDynamicSvg('parts/house1o', blueWhite),
      new SDynamicSvg('parts/houseb1', blueWhite, {
        x: 30,
        wid: 200,
      }),
      */
    ];
    function addHouseRow(x0, y, n) {
      for (var i=0; i<n; i++) {
        var building = new SDynamicSvg('parts/houseb2', blueWhite, {
          x: x0 + 200 * i,
          y: y,
          wid: 200,
        });
        $scope.dynamicSvgs.push(building);
      }
    }
    addHouseRow(120, 70, 3);
    addHouseRow(30, 0, 4);
  });
