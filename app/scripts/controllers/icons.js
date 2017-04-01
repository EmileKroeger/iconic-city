'use strict';

/**
 * @ngdoc function
 * @name iconicApp.controller:IconsCtrl
 * @description
 * # IconsCtrl
 * Controller of the iconicApp
 */
angular.module('iconicApp')
  .controller('IconsCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    var icons = ['ammonite', 'angular-spider', 'bat', 'bear-face', 'bee', 'bull-horns', 'butterfly', 'chess-knight', 'desert-skull', 'donkey', 'dragonfly', 'eagle-emblem', 'elephant', 'evil-bat', 'falcon-moon', 'feline', 'fox-head', 'frog', 'gecko', 'giant-squid', 'goat', 'gold-scarab', 'griffin-symbol', 'horse-head', 'horseshoe', 'hound', 'lion', 'lynx-head', 'minotaur', 'mounted-knight', 'octopus', 'ouroboros', 'owl', 'paw-print', 'pegasus', 'pig', 'poison', 'raven', 'salamander', 'scarab-beetle', 'scorpion', 'sea-serpent', 'seahorse', 'shark-jaws', 'snake-totem', 'snake', 'spider-alt', 'spiked-snail', 'squid-head', 'squid', 'stag-head', 'swan', 'turtle-shell', 'turtle', 'vulture', 'wasp-sting', 'werewolf', 'white-cat', 'wolf-head', 'wolf-howl'];
    $scope.icons = icons; //[icons[0], icons[1]];
  });
