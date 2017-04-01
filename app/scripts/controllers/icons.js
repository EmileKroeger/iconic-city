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
var attributedKinds = {"bear-face":"animal","bat":"shadow","angular-spider":"evil","ammonite":"sea","desert-skull":"evil","dragonfly":"swamp","elephant":"animal","eagle-emblem":"animal","evil-bat":"evil","frog":"swamp","gecko":"swamp","fox-head":"animal","giant-squid":"sea","feline":"animal","hound":"animal","lion":"animal","lynx-head":"animal","horse-head":"animal","octopus":"sea","sea-serpent":"sea","poison":"evil","raven":"shadow","shark-jaws":"sea","spider-alt":"evil","squid-head":"sea","squid":"sea","stag-head":"animal","swan":"swamp","turtle-shell":"swamp","turtle":"swamp","vulture":"shadow","wasp-sting":"evil","white-cat":"animal","wolf-head":"animal","wolf-howl":"animal","snake":"evil","scorpion":"evil","seahorse":"sea","snake-totem":"evil"};
    var colorSchemes = [
      {
        name: "undecided",
        fg: "white",
        bg: "grey",
      },
      {
        name: "animal",
        fg: "black",
        bg: "lightgrey",
      },
      {
        name: "ice",
        fg: "white",
        bg: "blue",
      },
      {
        name: "swamp",
        fg: "brown",
        bg: "lightgreen",
      },
      {
        name: "sea",
        fg: "lightgreen",
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
    function findSchemeIndex(name) {
      // Helper to get index from name
      var found = 0
      colorSchemes.forEach(function(scheme, index) {
        if (scheme.name == name) {
          found = index;
        }
      });
      return found;
    }
    $scope.scheme = colorSchemes[1];
    var icons = ['ammonite', 'angular-spider', 'bat', 'bear-face', 'bee', 'bull-horns', 'butterfly', 'chess-knight', 'desert-skull', 'donkey', 'dragonfly', 'eagle-emblem', 'elephant', 'evil-bat', 'falcon-moon', 'feline', 'fox-head', 'frog', 'gecko', 'giant-squid', 'goat', 'gold-scarab', 'griffin-symbol', 'horse-head', 'horseshoe', 'hound', 'lion', 'lynx-head', 'minotaur', 'mounted-knight', 'octopus', 'ouroboros', 'owl', 'paw-print', 'pegasus', 'pig', 'poison', 'raven', 'salamander', 'scarab-beetle', 'scorpion', 'sea-serpent', 'seahorse', 'shark-jaws', 'snake-totem', 'snake', 'spider-alt', 'spiked-snail', 'squid-head', 'squid', 'stag-head', 'swan', 'turtle-shell', 'turtle', 'vulture', 'wasp-sting', 'werewolf', 'white-cat', 'wolf-head', 'wolf-howl'];
    //$scope.icons = icons; //[icons[0], icons[1]];
    $scope.coats = [];
    icons.forEach(function(icon, i) {
      //console.debug([icon, i]);
      var schemeIndex = findSchemeIndex(attributedKinds[icon]);
      var coat = {
        "icon": icon,
        "schemeIndex": schemeIndex,
        "scheme": colorSchemes[schemeIndex],
      };
      coat.cycle = function() {
        console.debug("cycle")
        coat.schemeIndex = (coat.schemeIndex + 1) % colorSchemes.length;
        coat.scheme = colorSchemes[coat.schemeIndex];
        if (coat.scheme.name == "undecided") {
          delete attributedKinds[coat.icon];
        } else {
          attributedKinds[coat.icon] = coat.scheme.name;
        }
        console.log("var attributedKinds = " + JSON.stringify(attributedKinds) + ";");
      };
      $scope.coats.push(coat);
    })
  });
