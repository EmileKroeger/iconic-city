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
    // Helper class, applies a dynamic configuration to a SVG object.
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
      angular.forEach(this.classColors, function(colors, cls) {
        if (colors.constructor == Array) {
          dynamicSvg.setClassColor(cls, colors[0], colors[1]);
        } else {
          dynamicSvg.setClassColor(cls, colors, colors);
        }
      });
    };
    return ColorScheme;
  })
  .service('SShuffleBag', function() {
    function ShuffleBag(items, repeat) {
      // An ininite bag of shuffled items.
      this.items = items.slice(0);
      while (repeat) {
        Array.prototype.push.apply(this.items, items);
        repeat = repeat - 1;
      }
      this.pool = [];
      this.refresh();
    }
    ShuffleBag.prototype.refresh = function() {
      // Refills and shuffles the pool if needed.
      if (!this.pool.length) {
        this.pool = this.items.slice(0);
        for (let i = this.pool.length; i; i--) {
            let j = Math.floor(Math.random() * i);
            [this.pool[i - 1], this.pool[j]] = [this.pool[j], this.pool[i - 1]];
        }
      }
    };
    ShuffleBag.prototype.draw = function() {
      var result = this.pool.pop();
      this.refresh();
      return result;
    };
    return ShuffleBag;
  })
  .service('sRandomUtils', function() {
    function coinflip() {
      return Math.random() < 0.5;
    }
    return {
      coinflip: coinflip,
    };
  })
  .service('SGridPlacer', function(SDynamicSvg, sRandomUtils) {
    function GridPlacer(wid, hei) {
      this.wid = wid;
      this.hei = hei;
      this.deltaX = 100;
      this.buildingWid = 200;
      this.deltaY = 30;
      this.buildings = [];
      this.grid = {};
    }
    GridPlacer.prototype.fillLineI = function(i0, j0, iRange, callback) {
      //console.debug("linei i=" + i0 + "+" + iRange + " j=" + j0);
      for(var i = 0; i < i0 + iRange; i++) {
        callback(i, j0, true);
      }
    };
    GridPlacer.prototype.fillLineJ = function(i0, j0, jRange, callback) {
      //console.debug("linej i=" + i0 + " j=" + j0 + "+" + jRange);
      for(var j = j0; j < j0 + jRange; j++) {
        callback(i0, j, false);
      }
    };
    GridPlacer.prototype.fillRect = function(
      i0, j0, iRange, jRange, callback) {
      //console.debug("??? i=" + i0 + "+" + iRange + " j=" + j0 + "+" +jRange);
      if (iRange <= 1) {
        this.fillLineJ(i0, j0, jRange, callback);
      } else if (jRange <= 1) {
        this.fillLineI(i0, j0, iRange, callback);
      } else {
        var rand = Math.random();
        if (rand < 0.5) {
          // Split by i
          var iMid = Math.floor(iRange / 2);
          this.fillRect(i0, j0, iMid, jRange, callback);
          this.fillRect(i0 + iMid, j0, iRange - iMid, jRange, callback);
        } else {
          // Split by j
          var jMid = Math.floor(jRange / 2);
          this.fillRect(i0, j0, iRange, jMid, callback);
          this.fillRect(i0, j0 + jMid, iRange, jRange - jMid, callback);
        }
      }
    };
    GridPlacer.prototype.fill = function(buildingBag, colorBag) {
      var self = this;
      this.fillRect(0, 0, this.wid, this.hei, function(i, j, flip) {
        var key = i + '-' + j;
        var buildingImage = buildingBag.draw();
        var dX = Math.random() * 10;
        var dY = Math.random() * 10;
        var building = new SDynamicSvg(buildingImage, colorBag.draw(), {
          x: self.deltaX * (0.9 * i + self.hei - j) + dX,
          y: self.deltaY * (i + 1.1 * j) + dY,
          wid: self.buildingWid,
          flip: flip,
        });
        self.grid[key] = building;
      });
      /*
      for(var i = 0; i < this.wid; i++) {
        var flip = sRandomUtils.coinflip();
        for(var j = 0; j < this.hei; j++) {
          //this.buildings.push(building);
        }
      }
      */
    };
    GridPlacer.prototype.iterBuildings = function(callback) {
      // TODO: sort or something
      for(var i = this.wid - 1; i >= 0; i--) {
        for(var j = this.hei - 1; j >= 0; j--) {
          var key = i + '-' + j;
          if (this.grid[key]) {
            callback(this.grid[key]);
          }
        }
      }
    };
    return GridPlacer;
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
      this.flip = false;
      if (pos.flip) {
        this.style.transform = 'scaleX(-1)';
        this.flip = true;
      }
      //console.debug(this.style);
    }
    DynamicSvg.prototype.setElementColor = function(element, leftcolor, rightcolor) {
      var isLeft = angular.element(element).hasClass("left");
      if (this.flip) {
        isLeft = !isLeft;
      }
      if (isLeft) {
        element.setAttribute('fill', leftcolor);
      } else {
        element.setAttribute('fill', rightcolor);
      }
    }
    DynamicSvg.prototype.setTagColor = function(tag, color) {
      // Helper: color one kind of tag
      var elements = this.svgDoc.getElementsByTagName(tag);
      for (var i=0; i<elements.length; i++) {
        elements[i].setAttribute('fill', color);
      }
    };
    DynamicSvg.prototype.setClassColor = function(cls, leftcolor, rightcolor) {
      // Helper: color one class
      var elements = this.svgDoc.getElementsByClassName(cls);
      for (var i=0; i<elements.length; i++) {
        this.setElementColor(elements[i], leftcolor, rightcolor);
      }
    };
    DynamicSvg.prototype.loaded = function() {
      // Callback when an elemnt is loaded
      this.svgDoc = document.getElementById(this.id).contentDocument;
      this.scheme.apply(this);
    };
    return DynamicSvg;
  })
  .controller('CityCtrl', function ($scope, SDynamicSvg, SColorScheme,
    SShuffleBag, sRandomUtils, SGridPlacer) {
    //var red = new SColorScheme({
    //  'path': 'red',
    //});
    var blueWhite = new SColorScheme({
      '.wall': ['lightgrey', 'white'],
      '.feature': ['darkblue', 'blue'],
      '.roof': ['darkblue', 'blue'],
    });
    var redWhite = new SColorScheme({
      '.wall': ['lightgrey', 'white'],
      '.feature': ['darkred', 'red'],
      '.roof': ['darkred', 'red'],
    });
    var seriousColors = [blueWhite, redWhite];
    var debugColors = [new SColorScheme({
      '.wall': ['darkred', 'red'],
      '.feature': ['darkgreen', 'green'],
      '.roof': ['darkblue', 'blue'],
    })];
    var colorBag = new SShuffleBag(seriousColors, 3);
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
    var HOUSES = ['parts/houseb1', 'parts/houseb2',
                  'parts/houseb3', 'parts/houseb4',
                  'parts/towerb1', 'parts/towerb3',
                  'parts/towerb4',
    ];
    var houseBag = new SShuffleBag(HOUSES, 2);
    
    var gridPlacer = new SGridPlacer(5, 5);
    gridPlacer.fill(houseBag, colorBag);
    gridPlacer.iterBuildings(function(building) {
      $scope.dynamicSvgs.push(building);
    });
    
    /*
    
    
    function addHouseRow(x0, y, n) {
      for (var i=0; i<n; i++) {
        var building = new SDynamicSvg(houseBag.draw(), colorBag.draw(), {
          x: x0 + 100 * i,
          y: y - 20 * i,
          wid: 200,
          flip: sRandomUtils.coinflip(),
        });
        $scope.dynamicSvgs.push(building);
      }
    }
    addHouseRow(480, 340, 3);
    addHouseRow(300, 300, 5);
    addHouseRow(120, 260, 6);
    addHouseRow(30, 200, 5);
    */
  });
