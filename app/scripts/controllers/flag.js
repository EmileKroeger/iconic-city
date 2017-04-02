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
    var height = 200
    var bannerstyle = {
      //'-webkit-mask-box-image': iconUrl,
      //'mask': iconUrl,
      position: 'absolute',
      left: "0px",
      display: 'inline-block',
      'background-color': "yellow",
      height: (height - 40) + "px",
      top: '60px',
      width: "280px",
      border: "20px solid red",
      'border-right': 0,
    };
    var tailstyle = {
      //'-webkit-mask-box-image': iconUrl,
      position: 'absolute',
      left: "300px",
      top: '60px',
      display: 'inline-block',
      'border-left': "200px solid red",
      'border-top': "100px solid rgba(0, 0, 0, 0)",
      'border-bottom': "100px solid rgba(0, 0, 0, 0)",
      height: "0px",
    };
    $scope.elements = [bannerstyle, tailstyle]
    
  });
