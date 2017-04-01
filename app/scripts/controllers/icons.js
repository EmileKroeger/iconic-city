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
    var colorSchemes = [
      {
        bg: "red",
        fg: "yellow",
      },
      {
        bg: "blue",
        fg: "white",
      },
      {
        bg: "brown",
        fg: "lightgreen",
      },
      {
        bg: "green",
        fg: "blue",
      },
      {
        bg: "grey",
        fg: "black",
      },
    ];
    $scope.scheme = colorSchemes[1];
    var icons = ['ammonite', 'angular-spider', 'bat', 'bear-face', 'bee', 'bull-horns', 'butterfly', 'chess-knight', 'desert-skull', 'donkey', 'dragonfly', 'eagle-emblem', 'elephant', 'evil-bat', 'falcon-moon', 'feline', 'fox-head', 'frog', 'gecko', 'giant-squid', 'goat', 'gold-scarab', 'griffin-symbol', 'horse-head', 'horseshoe', 'hound', 'lion', 'lynx-head', 'minotaur', 'mounted-knight', 'octopus', 'ouroboros', 'owl', 'paw-print', 'pegasus', 'pig', 'poison', 'raven', 'salamander', 'scarab-beetle', 'scorpion', 'sea-serpent', 'seahorse', 'shark-jaws', 'snake-totem', 'snake', 'spider-alt', 'spiked-snail', 'squid-head', 'squid', 'stag-head', 'swan', 'turtle-shell', 'turtle', 'vulture', 'wasp-sting', 'werewolf', 'white-cat', 'wolf-head', 'wolf-howl'];
    $scope.icons = icons; //[icons[0], icons[1]];
    $scope.coats = [];
    icons.forEach(function(icon, i) {
      console.debug([icon, i]);
      var coat = {
        "icon": icon,
        "scheme": colorSchemes[i % colorSchemes.length],
      };
      $scope.coats.push(coat)
    })
  });
