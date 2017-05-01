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
      link: function postLink(scope /*, element, attrs*/) {
        var scheme = scope.content.scheme;
        var cls = scope.content.class;
        var iconUrl = 'url(images/icons/' + scope.content.icon + '.svg)';
        var elements = [];
        if (cls === 'simple') {
          elements = [{
            cls: 'glyph',
            style: {
              '-webkit-mask-box-image': iconUrl,
              'background-color': scheme.fg,
            },
          }];
        } else if (cls === 'bordered') {
          elements = [{
            cls: 'thickborder',
            style: {
              'border-color': scheme.fg,
            },
          }, {
            cls: 'glyph',
            style: {
              '-webkit-mask-box-image': iconUrl,
              'background-color': scheme.fg,
            },
          }];
        } else if (cls === 'crested') {
          elements = [{
            cls: 'topborder',
            style: {
              'border-color': scheme.fg,
            },
          }, {
            cls: 'glyph',
            style: {
              '-webkit-mask-box-image': iconUrl,
              'background-color': scheme.fg,
            },
          }];
        } else if (cls === 'triple') {
          elements = [{
            cls: 'glyph',
            style: {
              '-webkit-mask-box-image': iconUrl,
              'background-color': scheme.fg,
              'left': '25%',
            },
          }, {
            cls: 'glyph',
            style: {
              '-webkit-mask-box-image': iconUrl,
              'background-color': scheme.fg,
              'left': '75%',
            },
          }, {
            cls: 'glyph',
            style: {
              '-webkit-mask-box-image': iconUrl,
              'background-color': scheme.fg,
              'top': '70px',
            },
          }];
        } else if (cls === 'quartered') {
          elements = [{
            cls: 'toprightquarter',
            style: {
              'background-color': scheme.fg,
            },
          }, {
            cls: 'bottomleftquarter',
            style: {
              'background-color': scheme.fg,
            },
          }, {
            cls: 'glyph',
            style: {
              '-webkit-mask-box-image': iconUrl,
              'background-color': scheme.fg,
              'left': '25%',
              'top': '10px',
            },
          }, {
            cls: 'glyph',
            style: {
              '-webkit-mask-box-image': iconUrl,
              'background-color': scheme.fg,
              'left': '75%',
              'top': '70px',
            },
          }];
        }
        scope.elements = elements;
        //'border-color': content.scheme.fg
      }
    };
  });
