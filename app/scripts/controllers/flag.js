'use strict';

/**
 * @ngdoc function
 * @name iconicApp.controller:FlagCtrl
 * @description
 * # FlagCtrl
 * Controller of the iconicApp
 */
angular.module('iconicApp')
  .controller('FlagCtrl', function ($scope) {
    $scope.elements = [];
    function addTriangle(elements, x, y, wid, hei, color) {
      elements.push({
        left: x + "px",
        top: y + "px",
        'border-left': wid + "px solid " + color,
        'border-top': (hei / 2) + "px solid rgba(0, 0, 0, 0)",
        'border-bottom': (hei / 2) + "px solid rgba(0, 0, 0, 0)",
        height: "0px",
      });
    }
    function addRectangle(elements, x, y, wid, hei, color) {
      elements.push({
        left: x + "px",
        top: y + "px",
        height: hei + "px",
        width: wid + "px",
        "background-color": color,
      });
    }
    function addHorizontalFlag(elements, x, y, wid, hei, widTail,
      border, color, borderColor) {
        // We need to calculate an offset to keep a correct diagonal
        // border
        var hypo = Math.sqrt(widTail * widTail + hei * hei);
        var cosA = widTail / hypo;
        var sinA = hei / hypo;
        var shrink = border * (1 - cosA) / sinA;
        addRectangle(elements, x, y, wid, hei, borderColor);
        addRectangle(elements, x + border, y + border, wid - border - shrink,
          hei - (2 * border), color);
        addTriangle(elements, x + wid, y, widTail, hei, borderColor);
        var subhei = hei - (2 * border);
        var subwid = subhei * (widTail / hei)
        addTriangle(elements, x + wid - shrink, y + border, subwid, subhei, color);
    }
    addHorizontalFlag($scope.elements, 0, 0, 300, 300, 70, 40,
      "yellow", "red");
  });
