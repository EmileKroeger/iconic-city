'use strict';

/**
 * @ngdoc function
 * @name iconicApp.controller:ColorsCtrl
 * @description
 * # ColorsCtrl
 * Controller of the iconicApp
 */
angular.module('iconicApp')
  .controller('ColorsCtrl', function ($scope, sIconData) {
    
    var colorValues = {
      black: 'black',
      white: 'white',
      lightgrey: 'lightgrey',
      darkbrown: '#905314',
      lightred: '#FF0000',
      darkred: '#FF0000',
      lightyellow: '#FFE000',
      yellow: '#FFE000',
      darkyellow: '#FFE000',
      lightgreen: '#68D133',
      darkgreen: '#199419', // '#4CAF50',
      lightblue: '#54A2BB',
      darkblue: '#0000b2',
      darkpurple: '#790D79',
      lightpurple: '#a64ca6',
      
      
    };
    
    function adaptScheme(scheme) {
      var fg = scheme.fg;
      var bg = scheme.bg;
      if (colorValues[fg]) {
        fg = colorValues[fg];
      }
      if (colorValues[bg]) {
        bg = colorValues[bg];
      }
      return {
        name: scheme.name,
        fg: fg,
        bg: bg,
      }
    }
    function getAdaptedSchemes(scheme) {
      var schemes = [adaptScheme(scheme)];
      if (scheme.variants) {
        scheme.variants.forEach(function(subScheme) {
          schemes.push(adaptScheme(subScheme));
        })
      }
      return schemes;
    }
    
    $scope.coats = [];
    var byKind = {};
    angular.forEach(sIconData.attributedKinds, function(kind, icon) {
      //console.log(a + " " + b);
      if (byKind[kind] === undefined) {
        byKind[kind] = []
      }
      byKind[kind].push(icon);
    });
    var classes = ['simple', 'bordered', 'crested', 'triple', 'quartered'];
    var classIndex = 0;
    var shown = {}
    sIconData.schemes.forEach(function(scheme) {
      var icons = byKind[scheme.name];
      if (icons) {
        var schemes = getAdaptedSchemes(scheme);
        schemes.forEach(function(subScheme, i) {
          var color = subScheme.fg + " on " + subScheme.bg;
          if (!shown[color]) {
            shown[color] = true;
            var coat = {
              icon: icons[i % icons.length],
              scheme: subScheme,
              class: classes[classIndex],
              color: color,
            };
            $scope.coats.push(coat);
            classIndex = (classIndex + 1) % classes.length
            
          }
        });
      }
    })
  });
