'use strict';

/**
 * @ngdoc function
 * @name iconicApp.controller:IconsCtrl
 * @description
 * # IconsCtrl
 * Controller of the iconicApp
 */
angular.module('iconicApp')
  .service('sIconData', function() {
    var icons = ['acorn', 'all-seeing-eye', 'amethyst', 'ammonite-fossil', 'ammonite', 'amphora', 'angular-spider', 'ankh', 'anubis', 'anvil-impact', 'anvil', 'aquarius', 'aries', 'barbed-star', 'barbed-sun', 'barbute', 'bat-blade', 'bat', 'battle-axe', 'batwing-emblem', 'bear-face', 'bee', 'beech', 'beveled-star', 'black-knight-helm', 'bookmark', 'bookmarklet', 'boomerang-sun', 'bowen-knot', 'breastplate', 'broad-dagger', 'broadsword', 'broken-heart', 'brutal-helm', 'bud', 'bulb', 'bull-horns', 'burning-book', 'burning-dot', 'burning-embers', 'burning-eye', 'burning-meteor', 'burning-passion', 'burning-skull', 'burning-tree', 'butterfly', 'caduceus', 'cancer', 'candle-holder', 'capitol', 'capricorn', 'carnival-mask', 'castle', 'castle2', 'chained-heart', 'cherish', 'chess-king', 'chess-knight', 'chess-queen', 'claw-hammer', 'cloak-dagger', 'clover-spiked', 'clover', 'clover2', 'clubs', 'coliseum', 'condor-emblem', 'crested-helmet', 'crossed-axes', 'crossed-bones', 'crossed-sabres', 'crossed-swords', 'crown-coin', 'crown-of-thorns', 'crown', 'crowned-heart', 'crowned-skull', 'crystal-shine', 'curled-leaf', 'curly-mask', 'curly-wing', 'cursed-star', 'cut-diamond', 'daemon-skull', 'dagger-rose', 'daggers', 'daisy', 'death-note', 'death-skull', 'dervish-swords', 'desert-skull', 'diamond-ring', 'diamonds', 'dig-dug', 'divided-spiral', 'domino-mask', 'donkey', 'double-face-mask', 'doubled', 'dove', 'dragonfly', 'drakkar', 'dripping-star', 'duality-mask', 'dwarf-helmet', 'dwarf-king', 'dwennimmen', 'eagle-emblem', 'eclipse-flare', 'elephant', 'elf-helmet', 'ember-shot', 'emerald', 'enlightenment', 'ermine', 'european-flag', 'evil-bat', 'evil-fork', 'evil-wings', 'eye-of-horus', 'fairy', 'falcon-moon', 'falling-leaf', 'feather', 'feline', 'female', 'fire-bowl', 'fire-ring', 'fire-silhouette', 'fire-zone', 'fire', 'fireflake', 'fist', 'fist2', 'flail', 'flame-spin', 'flame', 'flamed-leaf', 'flamer', 'flaming-trident', 'flanged-mace', 'fleur-de-lys', 'floating-crystal', 'flower-star', 'fluffy-trefoil', 'fluffy-wing', 'fox-head', 'freedom-dove', 'freemasonry', 'frog', 'frozen-orb', 'g-clef', 'galea', 'galleon', 'gamepad-cross', 'gauls-helm', 'gauntlet', 'gecko', 'gemini', 'giant-squid', 'gladius', 'goat', 'gold-scarab', 'gooey-eyed-sun', 'gothic-cross', 'grapes', 'greek-sphinx', 'greek-temple', 'griffin-symbol', 'grim-reaper', 'harpoon-trident', 'harpy', 'hawk-emblem', 'heart-wings', 'heartburn', 'hearts', 'heat-haze', 'heavy-helm', 'hemp', 'heptagram', 'hieroglyph-y', 'holy-grail', 'holy-hand-grenade', 'holy-symbol', 'hops', 'horned-helm', 'horse-head', 'horse-head2', 'horseshoe', 'horus', 'hospital-cross', 'hound', 'hunting-horn', 'ifrit', 'imp-laugh', 'indian-palace', 'ionic-column', 'iron-mask', 'jester-hat', 'jewel-crown', 'jug', 'justice-star', 'key', 'key2', 'lantern-flame', 'laurel-crown', 'laurels', 'leo', 'libra', 'life-in-the-balance', 'lightning-tear', 'linden-leaf', 'lion', 'lit-candelabra', 'lotus-flower', 'lotus', 'lynx-head', 'lyre', 'mace-head', 'magic-lamp', 'male', 'maple-leaf', 'mayan-pyramid', 'maze-cornea', 'maze-saw', 'maze', 'medieval-gate', 'mermaid', 'minerals', 'minotaur', 'moebius-star', 'monster-grasp', 'mounted-knight', 'nested-hexagons', 'ninja-star', 'oak-leaf', 'oak', 'oat', 'octogonal-eye', 'octopus', 'omega', 'one-eyed', 'open-book', 'ophiuchus', 'orbital', 'ouroboros', 'owl', 'oyster-pearl', 'palm-tree', 'paw-print', 'peaks', 'pegasus', 'pentacle', 'pentagram-rose', 'pig', 'pine-tree', 'pisces', 'plain-dagger', 'pointy-hat', 'poison', 'pope-crown', 'potion-ball', 'power-lightning', 'queen-crown', 'quill-ink', 'quill', 'raven', 'relic-blade', 'rose', 'round-bottom-flask', 'round-star', 'royal-love', 'rupee', 'sacrificial-dagger', 'sagittarius', 'sai', 'salamander', 'scales', 'scallop', 'scarab-beetle', 'scorpio', 'scorpion', 'scroll-unfurled', 'sea-dragon', 'sea-serpent', 'seahorse', 'semi-closed-eye', 'seven-pointed-star', 'shard-sword', 'shark-jaws', 'sharped-teeth-skull', 'sheikah-eye', 'shut-rose', 'sickle', 'skeleton-key', 'skull-crossed-bones', 'small-fire', 'snake-totem', 'snake', 'snowflake-1', 'snowflake-2', 'spades', 'spartan-helmet', 'spartan', 'spider-alt', 'spiked-snail', 'spikes-full', 'spikes-half', 'spikes-init', 'spikes', 'spiral-bloom', 'spiral-bottle', 'spiral-shell', 'split-cross', 'spoted-flower', 'sprout-disc', 'sprout', 'squid-head', 'squid', 'stag-head', 'star-formation', 'star-sattelites', 'stars-stack', 'staryu', 'steelwing-emblem', 'stiletto', 'stone-crafting', 'stone-throne', 'stone-tower', 'striped-sun', 'sun', 'sunbeams', 'sunrise', 'swan', 'sword-smithing', 'sword-spade', 'target-arrows', 'taurus', 'templar-eye', 'templar-heart', 'third-eye', 'thor-hammer', 'three-leaves', 'thunder-skull', 'tied-scroll', 'tomahawk', 'topaz', 'torch', 'tower-fall', 'trample', 'tree-branch', 'trefoil-lily', 'triforce', 'triple-beak', 'triple-corn', 'triple-plier', 'triple-yin', 'triquetra', 'trireme', 'turtle-shell', 'turtle', 'twirly-flower', 'ubisoft-sun', 'unicorn', 'viking-helmet', 'vine-leaf', 'viola', 'virgo', 'visored-helm', 'vulture', 'war-pick', 'warlock-eye', 'wasp-sting', 'water-fountain', 'werewolf', 'wheat', 'white-cat', 'white-tower', 'windmill', 'wing-cloak', 'winged-emblem', 'winged-leg', 'winged-shield', 'winged-sword', 'wolf-head', 'wolf-howl', 'wood-club', 'wyvern', 'yin-yang', 'zeus-sword', 'zigzag-leaf'];

    var attributedKinds = {"bear-face":"animal","bat":"shadow","angular-spider":"evil","ammonite":"sea","desert-skull":"evil","dragonfly":"insect","elephant":"animal","eagle-emblem":"animal","evil-bat":"evil","frog":"swamp","gecko":"swamp","fox-head":"animal","giant-squid":"sea","feline":"animal","hound":"animal","lion":"animal","lynx-head":"animal","horse-head":"animal","octopus":"sea","sea-serpent":"sea","poison":"evil","raven":"shadow","shark-jaws":"sea","spider-alt":"evil","squid-head":"sea","squid":"sea","stag-head":"animal","turtle-shell":"swamp","turtle":"swamp","vulture":"shadow","wasp-sting":"evil","white-cat":"animal","wolf-head":"animal","wolf-howl":"animal","snake":"evil","scorpion":"evil","seahorse":"sea","snake-totem":"evil","donkey":"mundane","goat":"mundane","pig":"mundane","bee":"insect","scarab-beetle":"insect","butterfly":"insect","gold-scarab":"insect","griffin-symbol":"animal","minotaur":"animal","werewolf":"animal","pegasus":"animal","owl":"animal","ouroboros":"animal","all-seeing-eye":"mystical","ankh":"mystical","anvil-impact":"work","anvil":"work","aquarius":"abstract","acorn":"nature","aries":"abstract","barbed-star":"mystical","barbed-sun":"mystical","barbute":"evil","bat-blade":"evil","black-knight-helm":"military","beveled-star":"abstract","beech":"nature","battle-axe":"military","breastplate":"military","brutal-helm":"military","broadsword":"military","broad-dagger":"military","boomerang-sun":"abstract","bowen-knot":"abstract","bud":"nature","bulb":"nature","burning-book":"fire","burning-dot":"fire","burning-embers":"fire","burning-eye":"mystical","burning-meteor":"fire","burning-passion":"fire","burning-skull":"fire","burning-tree":"fire","caduceus":"mystical","cancer":"abstract","capricorn":"abstract","carnival-mask":"shadow","chained-heart":"mystical","claw-hammer":"military","cloak-dagger":"evil","clover-spiked":"abstract","clover":"nature","clover2":"abstract","clubs":"abstract","crested-helmet":"military","crossed-axes":"military","crossed-sabres":"military","crossed-bones":"evil","crossed-swords":"military","crown-of-thorns":"nature","amethyst":"mystical","batwing-emblem":"mystical","anubis":"mystical","capitol":"building","castle":"building","castle2":"building","coliseum":"building","condor-emblem":"noble","crown-coin":"noble","crown":"noble","crowned-heart":"noble","crowned-skull":"evil","crystal-shine":"mystical","curled-leaf":"nature","curly-mask":"mystical","cursed-star":"mystical","cut-diamond":"mystical","daggers":"military","daisy":"nature","death-note":"evil","daemon-skull":"evil","death-skull":"evil","dervish-swords":"military","diamond-ring":"noble","diamonds":"abstract","dig-dug":"work","divided-spiral":"abstract","domino-mask":"shadow","double-face-mask":"mystical","doubled":"abstract","dripping-star":"mystical","duality-mask":"mystical","dwarf-helmet":"military","dwarf-king":"military","dwennimmen":"abstract","eclipse-flare":"mystical","elf-helmet":"military","ember-shot":"fire","emerald":"mystical","enlightenment":"mystical","ermine":"noble","european-flag":"abstract","evil-fork":"evil","evil-wings":"evil","eye-of-horus":"mystical","fairy":"mystical","falling-leaf":"nature","female":"abstract","fire-bowl":"fire","fire-ring":"fire","fire-silhouette":"fire","fire-zone":"fire","fire":"fire","fireflake":"abstract","fist":"military","fist2":"military","flail":"military","flame-spin":"fire","flame":"fire","flamed-leaf":"fire","flamer":"fire","flaming-trident":"fire","flanged-mace":"military","fleur-de-lys":"noble","floating-crystal":"mystical","flower-star":"abstract","fluffy-trefoil":"abstract","fluffy-wing":"abstract","frozen-orb":"abstract","freemasonry":"work","galea":"military","gauls-helm":"military","gauntlet":"military","gemini":"abstract","gamepad-cross":"abstract","gladius":"military","gooey-eyed-sun":"mystical","gothic-cross":"abstract","grapes":"nature","greek-sphinx":"mystical","greek-temple":"building","grim-reaper":"shadow","harpoon-trident":"evil","harpy":"evil","heartburn":"fire","hearts":"abstract","heat-haze":"abstract","heavy-helm":"military","heptagram":"mystical","hemp":"nature","holy-symbol":"abstract","hops":"nature","horned-helm":"military","horseshoe":"work","horus":"mystical","hospital-cross":"abstract","ifrit":"fire","imp-laugh":"evil","indian-palace":"building","ionic-column":"building","iron-mask":"mystical","jester-hat":"work","jewel-crown":"noble","jug":"objects","justice-star":"abstract","lantern-flame":"fire","libra":"abstract","leo":"abstract","laurels":"noble","laurel-crown":"noble","lightning-tear":"mystical","linden-leaf":"nature","lotus-flower":"nature","lotus":"nature","mace-head":"military","male":"abstract","maple-leaf":"nature","mayan-pyramid":"building","maze-cornea":"mystical","maze-saw":"mystical","maze":"mystical","medieval-gate":"building","mermaid":"sea","minerals":"mystical","moebius-star":"abstract","monster-grasp":"evil","mounted-knight":"military","nested-hexagons":"abstract","ninja-star":"abstract","octogonal-eye":"mystical","oak-leaf":"nature","oak":"nature","oat":"nature","omega":"abstract","one-eyed":"mystical","ophiuchus":"abstract","orbital":"abstract","oyster-pearl":"sea","palm-tree":"nature","pentacle":"mystical","pentagram-rose":"mystical","pine-tree":"nature","pisces":"abstract","plain-dagger":"military","power-lightning":"mystical","queen-crown":"noble","relic-blade":"military","rose":"nature","round-star":"abstract","potion-ball":"wizards","royal-love":"abstract","rupee":"mystical","sacrificial-dagger":"evil","sagittarius":"abstract","scorpio":"abstract","seven-pointed-star":"abstract","semi-closed-eye":"mystical","sea-dragon":"evil","sai":"evil","salamander":"fire","scales":"noble","scallop":"sea","shard-sword":"evil","sharped-teeth-skull":"evil","sheikah-eye":"mystical","shut-rose":"nature","sickle":"work","skull-crossed-bones":"shadow","skeleton-key":"shadow","small-fire":"fire","snowflake-1":"abstract","snowflake-2":"abstract","spades":"abstract","spartan-helmet":"military","spartan":"military","spiked-snail":"mystical","spikes-full":"abstract","spikes-half":"abstract","spikes-init":"abstract","spikes":"abstract","spiral-bloom":"nature","spiral-shell":"sea","split-cross":"abstract","spoted-flower":"abstract","sprout-disc":"abstract","sprout":"nature","star-formation":"abstract","star-sattelites":"mystical","stars-stack":"abstract","staryu":"abstract","steelwing-emblem":"noble","stone-throne":"noble","stone-crafting":"work","stiletto":"military","stone-tower":"building","striped-sun":"abstract","sun":"abstract","sword-smithing":"work","sword-spade":"work","target-arrows":"military","taurus":"abstract","templar-eye":"mystical","templar-heart":"mystical","third-eye":"mystical","thor-hammer":"military","three-leaves":"nature","thunder-skull":"evil","tomahawk":"military","topaz":"abstract","torch":"fire","tower-fall":"building","trample":"work","tree-branch":"nature","trefoil-lily":"abstract","triforce":"abstract","triple-beak":"abstract","triple-corn":"abstract","triple-plier":"abstract","triple-yin":"abstract","triquetra":"abstract","twirly-flower":"abstract","ubisoft-sun":"abstract","viking-helmet":"military","vine-leaf":"nature","viola":"abstract","virgo":"abstract","visored-helm":"military","war-pick":"military","warlock-eye":"mystical","wheat":"nature","white-tower":"building","windmill":"building","winged-leg":"evil","wood-club":"military","wyvern":"animal","yin-yang":"abstract","zeus-sword":"military","zigzag-leaf":"nature","bookmark":"wizards","bookmarklet":"wizards","cherish":"heavenly","curly-wing":"heavenly","dove":"heavenly","falcon-moon":"heavenly","feather":"heavenly","freedom-dove":"heavenly","g-clef":"heavenly","hawk-emblem":"heavenly","heart-wings":"heavenly","holy-grail":"heavenly","holy-hand-grenade":"heavenly","life-in-the-balance":"heavenly","lit-candelabra":"heavenly","lyre":"heavenly","open-book":"wizards","pointy-hat":"wizards","pope-crown":"heavenly","quill-ink":"wizards","quill":"wizards","round-bottom-flask":"wizards","scroll-unfurled":"wizards","spiral-bottle":"wizards","tied-scroll":"wizards","sunrise":"heavenly","sunbeams":"heavenly","wing-cloak":"heavenly","winged-emblem":"heavenly","winged-sword":"heavenly","amphora":"objects","candle-holder":"objects","chess-king":"objects","chess-knight":"objects","chess-queen":"objects","drakkar":"objects","hunting-horn":"objects","horse-head2":"animal","key":"objects","key2":"objects","magic-lamp":"objects","trireme":"objects","broken-heart":"abstract","ammonite-fossil":"mystical","bull-horns":"objects","dagger-rose":"nature","hieroglyph-y":"mystical","unicorn":"animal","winged-shield":"heavenly","swan":"heavenly","galleon":"objects","water-fountain":"objects"};


    var colorSchemes = [
      {
        name: "undecided",
        fg: "white",
        bg: "grey",
      },
      {
        name: "objects",
        fg: "black",
        bg: "yellow",
        variants: [
          {
            fg: "grey",
            bg: "white",
          },
          {
            fg: "darkred",
            bg: "white",
          },
          {
            fg: "darkblue",
            bg: "white",
          },
        ],
      },
      {
        name: "wizards",
        fg: "purple",
        bg: "lightblue",
        variants: [
          {
            fg: "lightblue",
            bg: "purple",
          },
          {
            fg: "purple",
            bg: "black",
          },
          {
            fg: "purple",
            bg: "white",
          },
          {
            fg: "white",
            bg: "purple",
          },
        ],
      },
      {
        name: "heavenly",
        fg: "lightblue",
        bg: "white",
        variants: [
          {
            fg: "yellow",
            bg: "white",
          },
          {
            fg: "white",
            bg: "lightblue",
          },
          {
            fg: "yellow",
            bg: "lightblue",
          },
        ]
      },
      {
        name: "mystical",
        fg: "pink",
        bg: "purple",
        variants: [
          {
            fg: "purple",
            bg: "black",
          },
          {
            fg: "green",
            bg: "black",
          },
          {
            fg: "lightblue",
            bg: "purple",
          },
          {
            fg: "white",
            bg: "purple",
          },
        ]
      },
      {
        name: "work",
        fg: "black",
        bg: "grey",
        variants: [
          {
            fg: "black",
            bg: "white",
          },
        ]
      },
      {
        name: "abstract",
        fg: "white",
        bg: "red",
        variants: [
          {
            fg: "white",
            bg: "blue",
          },
        ]
      },
      {
        name: "nature",
        fg: "yellow",
        bg: "green",
        variants: [
          {
            fg: "green",
            bg: "white",
          },
          {
            fg: "green",
            bg: "yellow",
          },
        ]
      },
      {
        name: "military",
        fg: "black",
        bg: "red",
        variants: [
          {
            fg: "black",
            bg: "yellow",
          },
          {
            fg: "red",
            bg: "yellow",
          },
          {
            fg: "white",
            bg: "red",
          },
          {
            fg: "yellow",
            bg: "red",
          },
        ]
      },
      {
        name: "fire",
        fg: "red",
        bg: "yellow",
        variants: [
          {
            fg: "yellow",
            bg: "red",
          },
          {
            fg: "red",
            bg: "black",
          },
          {
            fg: "yellow",
            bg: "black",
          },
        ]
      },
      {
        name: "building",
        fg: "black",
        bg: "grey",
        variants: [
          {
            fg: "black",
            bg: "yellow",
          },
          {
            fg: "grey",
            bg: "white",
          },
        ]
      },
      {
        name: "noble",
        fg: "yellow",
        bg: "purple",
        variants: [
          {
            fg: "yellow",
            bg: "red",
          },
          {
            fg: "purple",
            bg: "yellow",
          },
          {
            fg: "yellow",
            bg: "blue",
          },
        ]
      },
      {
        name: "animal",
        fg: "yellow",
        bg: "red",
        variants: [
          {
            fg: "red",
            bg: "yellow",
          },
          {
            fg: "black",
            bg: "yellow",
          },
          {
            fg: "black",
            bg: "green",
          },
          {
            fg: "yellow",
            bg: "green",
          },
        ]
      },
      {
        name: "mundane",
        fg: "brown",
        bg: "lightgrey",
        variants: [
          {
            fg: "black",
            bg: "grey",
          },
        ]
      },
      {
        name: "insect",
        fg: "yellow",
        bg: "blue",
        variants: [
          {
            fg: "green",
            bg: "white",
          },
          {
            fg: "black",
            bg: "yellow",
          },
        ]
      },
      {
        name: "swamp",
        fg: "brown",
        bg: "lightgreen",
        variants: [
          {
            fg: "white",
            bg: "green",
          },
          {
            fg: "black",
            bg: "lightgreen",
          },
        ]
      },
      {
        name: "sea",
        fg: "lightgreen",
        bg: "blue",
        variants: [
          {
            fg: "blue",
            bg: "lightgreen",
          },
        ]
      },
      {
        name: "evil",
        fg: "darkred",
        bg: "black",
        variants: [
          {
            fg: "red",
            bg: "black",
          },
        ]
      },
      {
        name: "shadow",
        fg: "darkgrey",
        bg: "black",
        variants: [
          {
            fg: "black",
            bg: "darkgrey",
          },
          {
            fg: "black",
            bg: "blue",
          },
          {
            fg: "blue",
            bg: "black",
          },
        ]
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
    return {
      icons: icons,
      attributedKinds: attributedKinds,
      schemes: colorSchemes,
      findSchemeIndex: findSchemeIndex,
    }
  })
  .controller('IconsCtrl', function ($scope, sIconData) {
    var icons = sIconData.icons;
    var colorSchemes = sIconData.schemes;
    var attributedKinds = sIconData.attributedKinds;

    //$scope.scheme = colorSchemes[1];
    //$scope.icons = icons; //[icons[0], icons[1]];
    $scope.schemes = colorSchemes;
    $scope.coatsByFamily = [];
    
    // Now build the stuff to display
    var numColors = colorSchemes.length
    
    icons.forEach(function(icon, i) {
      //console.debug([icon, i]);
      var schemeIndex = sIconData.findSchemeIndex(attributedKinds[icon]);
      var coat = {
        "icon": icon,
        "schemeIndex": schemeIndex,
        "scheme": colorSchemes[schemeIndex],
      };
      // Define click callback
      coat.cycle = function(evt) {
        console.debug("cycle")
        //console.debug(evt);
        var delta = 1;
        if (event.offsetX < 30) {
          delta = numColors - 1;
        }
        coat.schemeIndex = (coat.schemeIndex + delta) % numColors;
        coat.scheme = colorSchemes[coat.schemeIndex];
        if (coat.scheme.name == "undecided") {
          delete attributedKinds[coat.icon];
        } else {
          attributedKinds[coat.icon] = coat.scheme.name;
        }
        console.log("var attributedKinds = " + JSON.stringify(attributedKinds) + ";");
      };
      // Now assign it to the right family
      var family = colorSchemes[schemeIndex].name;
      if (!$scope.coatsByFamily[family]) {
        $scope.coatsByFamily[family] = []
      }
      $scope.coatsByFamily[family].push(coat);
    })
  });
