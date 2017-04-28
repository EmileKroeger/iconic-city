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
        if (colors.constructor === Array) {
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
    function choose(array) {
      var index = Math.floor(Math.random() * array.length);
      return array[index];
    }
    function randint(min, max) {
      var index = Math.floor(Math.random() * (max - min + 1));
      return min + index;
    }
    return {
      coinflip: coinflip,
      choose: choose,
      randint: randint,
    };
  })
  .service('SGridPlacer', function(SDynamicSvg, sRandomUtils) {
    var FORBIDDEN = 'FORBIDDEN';
    function GridPlacer(wid, hei, scale) {
      if (!scale) {
        scale = 1;
      }
      this.wid = wid;
      this.hei = hei;
      this.deltaX = 100 * scale;
      this.buildingWid = 200 * scale;
      this.deltaY = 30 * scale;
      this.towerOffset = 5 * scale;
      this.buildings = [];
      this.grid = {};
      this.scale = scale;
      // Snip the bottom
      var i;
      var j;
      var key;
      for (i = 0; i < this.wid; i++) {
        for (j = 0; j < (this.hei - 1 - i); j++) {
          key = i + '-' + j;
          this.grid[key] = FORBIDDEN;
        }
      }
      if (this.wid > 5) {
        // Snip the top
        var max = this.wid - 1 + this.hei - 1;
        for (i = 0; i < this.wid; i++) {
          for (j = 0; j < this.hei; j++) {
            if (i + j > (max - 3)) {
              key = i + '-' + j;
              this.grid[key] = FORBIDDEN;
            }
          }
        }
      }
      this.wallsegments = [];
      this.walltowers = [];
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
    GridPlacer.prototype.calcx = function(i, j) {
      return this.deltaX * (0.9 * i + this.hei - j);
    };
    GridPlacer.prototype.calcy = function(i, j) {
      return this.deltaY * (i + 1.1 * j);
    };
    GridPlacer.prototype.place = function(i, j, flip, buildingImage, color, scale) {
      if (!scale) {
        scale = 1;
      }
      var dX = Math.random() * 10;
      var dY = Math.random() * 10;
      var building = new SDynamicSvg(buildingImage, color, {
        x: this.calcx(i, j) + dX,
        y: this.calcy(i, j) + dY,
        wid: (this.buildingWid * scale),
        flip: flip,
      });
      var key = i + '-' + j;
      this.grid[key] = building;
    };
    GridPlacer.prototype.placeLandmark = function(buildingBag, colorBag) {
      var landmarkScale = 1.2;
      var i = sRandomUtils.randint(Math.floor(this.wid / 2), this.wid - 1);
      var j = sRandomUtils.randint(Math.floor(this.hei / 2), this.hei - 1);
      // Don't check if something was there
      var flip = sRandomUtils.coinflip();
      this.place(i, j, flip, buildingBag.draw(), colorBag.draw(),
          landmarkScale);
    };
    GridPlacer.prototype.scatter = function(buildingBag, colorBag, n, scale) {
      for (var k = 0; k < n; k++) {
        var i = sRandomUtils.randint(0, this.wid - 1);
        var j = sRandomUtils.randint(0, this.hei - 1);
        var key = i + '-' + j;
        if (!this.grid[key]) {
          var flip = sRandomUtils.coinflip();
          this.place(i, j, flip, buildingBag.draw(), colorBag.draw(), scale);
        }
      }
    };
    GridPlacer.prototype.fill = function(buildingBag, colorBag) {
      var self = this;
      this.fillRect(0, 0, this.wid, this.hei, function(i, j, flip) {
        var key = i + '-' + j;
        if (!self.grid[key]) {
          var buildingImage = buildingBag.draw();
          var color = colorBag.draw();
          self.place(i, j, flip, buildingImage, color);
        }
      });
    };
    GridPlacer.prototype.addWall = function(wallImage, towerImage, gateImage, colorBag) {
      var gateI = sRandomUtils.randint(1, this.wid - 1);
      for (var i = 0; i <= this.wid; i++) {
        var j = this.hei - 1 - i;
        if (i < this.wid) {
          var wall = new SDynamicSvg(wallImage, colorBag.draw(), {
            x: this.calcx(i, j),
            y: this.calcy(i, j),
            wid: this.buildingWid,
            flip: false,
          });
          this.wallsegments.push(wall);
        }
        var image = towerImage;
        if (i === gateI) {
          image = gateImage;
        }
        var tower = new SDynamicSvg(image, colorBag.draw(), {
          x: this.calcx(i - 0.5, j + 0.5),
          y: this.calcy(i - 0.5, j + 0.5) - this.towerOffset,
          wid: this.buildingWid,
          flip: false,
        });
        this.walltowers.push(tower);
      }
    };
    GridPlacer.prototype.iterBuildings = function(callback) {
      for(var i = this.wid - 1; i >= 0; i--) {
        for(var j = this.hei - 1; j >= 0; j--) {
          var key = i + '-' + j;
          var cell = this.grid[key];
          if (cell && (cell !== FORBIDDEN)) {
            callback(cell);
          }
        }
      }
      this.wallsegments.forEach(callback);
      this.walltowers.forEach(callback);
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
      var isLeft = angular.element(element).hasClass('left');
      if (this.flip) {
        isLeft = !isLeft;
      }
      if (isLeft) {
        element.setAttribute('fill', leftcolor);
      } else {
        element.setAttribute('fill', rightcolor);
      }
    };
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
    var stoneColor = new SColorScheme({
      '.wall': ['grey', 'lightgrey'],
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
    var stoneColorBag = new SShuffleBag([stoneColor], 1);
    $scope.dynamicSvgs = [];
    var HOUSES = [
      'parts/houseb1',
      'parts/houseb2',
      'parts/houseb3',
      'parts/houseb4',
    ];
    var TOWERS = [
      'parts/towerb1',
      'parts/towerb3',
      'parts/towerb4',
    ];
    var LANDMARKS = [
      'parts/churchb1',
      'parts/castleb1',
    ];
    var houseBag = new SShuffleBag(HOUSES, 2);
    var towerBag = new SShuffleBag(TOWERS, 2);
    var landmarkBag = new SShuffleBag(LANDMARKS, 1);
    
    //var gridPlacer = new SGridPlacer(4, 4, 1.0);
    var gridPlacer = new SGridPlacer(10, 10, 0.5);
    gridPlacer.placeLandmark(landmarkBag, stoneColorBag);
    gridPlacer.scatter(towerBag, stoneColorBag, 4);
    gridPlacer.fill(houseBag, colorBag);
    gridPlacer.addWall('parts/wallsectionb1', 'parts/walltowerb2',
        'parts/wallgateb1', stoneColorBag);
    gridPlacer.iterBuildings(function(building) {
      $scope.dynamicSvgs.push(building);
    });
  });
