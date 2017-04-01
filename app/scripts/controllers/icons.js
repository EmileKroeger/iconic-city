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
        name: "undecided",
        fg: "white",
        bg: "grey",
      },
      {
        name: "animal",
        fg: "black",
        bg: "green",
      },
      {
        name: "ice",
        fg: "white",
        bg: "blue",
      },
      {
        name: "swamp",
        fg: "lightgreen",
        bg: "brown",
      },
      {
        name: "sea",
        fg: "lightblue",
        bg: "blue",
      },
      {
        name: "evil",
        fg: "darkred",
        bg: "black",
      },
      {
        name: "shadow",
        fg: "darkgrey",
        bg: "black",
      },
    ];
    $scope.scheme = colorSchemes[1];
    var icons = ['ammonite', 'angular-spider', 'bat', 'bear-face', 'bee', 'bull-horns', 'butterfly', 'chess-knight', 'desert-skull', 'donkey', 'dragonfly', 'eagle-emblem', 'elephant', 'evil-bat', 'falcon-moon', 'feline', 'fox-head', 'frog', 'gecko', 'giant-squid', 'goat', 'gold-scarab', 'griffin-symbol', 'horse-head', 'horseshoe', 'hound', 'lion', 'lynx-head', 'minotaur', 'mounted-knight', 'octopus', 'ouroboros', 'owl', 'paw-print', 'pegasus', 'pig', 'poison', 'raven', 'salamander', 'scarab-beetle', 'scorpion', 'sea-serpent', 'seahorse', 'shark-jaws', 'snake-totem', 'snake', 'spider-alt', 'spiked-snail', 'squid-head', 'squid', 'stag-head', 'swan', 'turtle-shell', 'turtle', 'vulture', 'wasp-sting', 'werewolf', 'white-cat', 'wolf-head', 'wolf-howl'];
    $scope.icons = icons; //[icons[0], icons[1]];
    $scope.coats = [];
    icons.forEach(function(icon, i) {
      //console.debug([icon, i]);
      var schemeIndex = 0;
      var coat = {
        "icon": icon,
        "schemeIndex": schemeIndex,
        "scheme": colorSchemes[schemeIndex],
      };
      coat.cycle = function() {
        console.debug("cycle")
        coat.schemeIndex = (coat.schemeIndex + 1) % colorSchemes.length;
        coat.scheme = colorSchemes[coat.schemeIndex];
      }
      $scope.coats.push(coat);
    })
  });
