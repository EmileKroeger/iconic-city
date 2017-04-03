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
        left: x + 'px',
        top: y + 'px',
        'border-left': wid + 'px solid ' + color,
        'border-top': (hei / 2) + 'px solid rgba(0, 0, 0, 0)',
        'border-bottom': (hei / 2) + 'px solid rgba(0, 0, 0, 0)',
        height: '0px',
      });
    }
    function addRectangle(elements, x, y, wid, hei, color) {
      elements.push({
        left: x + 'px',
        top: y + 'px',
        height: hei + 'px',
        width: wid + 'px',
        'background-color': color,
      });
    }
    function getOffsetForDiagonal(border, base, len) {
      // Formula for keeping constant widths
      var hypo = Math.sqrt(len * len + base * base);
      var cosA = len / hypo;
      var sinA = base / hypo;
      return border * (1 - cosA) / sinA;
    }
    function addHorizontalFlag(elements, x, y, wid, hei, widTail,
      border, color, borderColor, tails) {
        //var tails = 1;
        // Calculate all the needed positions
        var subhei = (hei - (2 * border)) / tails;
        var tailHei = subhei + 2 * border;
        var subwid = subhei * (widTail / tailHei);
        var shrink = getOffsetForDiagonal(border, tailHei, widTail);
        // Add main "body" rectangle
        addRectangle(elements, x, y, wid, hei, borderColor);
        addRectangle(elements, x + border, y + border, wid - border - shrink,
          hei - (2 * border), color);
        // Add background tails
        for (var tail = 0; tail < tails; tail++) {
          var sttop = (y + border) + (subhei * tail);
          addTriangle(elements, x + wid, sttop - border, widTail, tailHei, borderColor);
        }
        // Add foreground tails
        for (var tail = 0; tail < tails; tail++) {
          var sttop = (y + border) + (subhei * tail);
          addTriangle(elements, x + wid - shrink, sttop, subwid, subhei, color);
        }
    }
    addHorizontalFlag($scope.elements, 0, 0, 300, 300, 150, 30,
      'white', 'blue', 3);
    addHorizontalFlag($scope.elements, 0, 320, 300, 300, 70, 40,
      'yellow', 'red', 1);
  });
