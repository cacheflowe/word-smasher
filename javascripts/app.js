var WordSmasherApp = (function(){
  // App properties
  // ------------------------------------------------------------------------
  var _words = [];
  var _sampleWords = 'aardvark, alligator, alpaca, anteater, antelope, ape, armadillo, baboon, badger, bat, bear, beaver, bighorn, bison, boar, buffalo, bull, bunny, camel, canary, capybara, cat, chameleon, cheetah, chimpanzee, chinchilla, chipmunk, cougar, cow, coyote, crocodile, crow, deer, dingo, dog, donkey, duckbill, elephant, elk, fawn, ferret, finch, fish, fox, frog, gazelle, giraffe, goat, gopher, gorilla, grizzly bear, ground hog, guinea pig, hamster, hedgehog, hippopotamus, horse, hyena, iguana, impala, jaguar, kangaroo, kitten, koala, lamb, lemur, leopard, lion, lizard, llama, lynx, marmoset, mole, mongoose, monkey, moose, mountain goat, mouse, mule, muskrat, newt, opossum, orangutan, otter, panda, panther, parakeet, parrot, pig, platypus, polar bear, porcupine, porpoise, prairie dog, rabbit, raccoon, rat, reindeer, rhinoceros, salamander, seal, sheep, skunk, sloth, snake, squirrel, stallion, tiger, toad, turtle, walrus, weasel, whale, wildcat, wolf, wombat, woodchuck, yak, zebra';
  var _wordSmasher = new WordSmasher();
  
  // Kick it off
  // ------------------------------------------------------------------------
  var init = function(){
    addButtonFunctionality();
  };

  // Parse textarea for words
  // ------------------------------------------------------------------------
  var addButtonFunctionality = function(){
    $('#go').bind('click',function(e){
      e.preventDefault();
      createWordList();
      if( _words.length > 0 ) showNewWordSmash();
    });
    $('#sample').bind('click',function(e){
      e.preventDefault();
      $('#word_input').val( _sampleWords );
      setTimeout(function(){
        createWordList();
        if( _words.length > 0 ) showNewWordSmash();
      },750);
    });
  };

  // Parse textarea for words
  // ------------------------------------------------------------------------
  var createWordList = function(){
    // parse words from input
    var input = $('#word_input').val();
    if( input.replace(/\s+/g," ") == '' ) return;
    input = input.replace(/, /gi, ",");           // replace spaces next to a comma
    input = input.replace(/(\r\n|\n|\r)/gm,",");  // replace line breaks
    input = input.replace(/\s+/g," ");            // replace multiple spaces
    var inputWords = input.split(',');

    // add new words to collection
    for( i=0; i < inputWords.length; i++ ){
      // exclude repeated words, super short words, and words without standard vowels. sorry, sometimes y.
      if( _words.indexOf( inputWords[i] ) == -1 && inputWords[i].length > 2 && _wordSmasher.getVowelPositions( inputWords[i] ).length > 0 ) {
        _words.push( inputWords[i] );
      }
    }

    // display words and clear the input
    $('#words').text(_words.join(', '));
    $('#word_input').val('');
  };

  // Get a random index
  // ------------------------------------------------------------------------
  var getRandomWordIndex = function() {
    return Math.round( Math.random() * (_words.length - 1) );
  };

  // Output word combos
  // ------------------------------------------------------------------------
  var showNewWordSmash = function() {
    $('#result').show();
    document.getElementById('result_smash').innerHTML = _wordSmasher.combineWords( _words[ getRandomWordIndex() ], _words[ getRandomWordIndex() ], true );
    document.getElementById('result_combo').innerHTML = _words[ getRandomWordIndex() ].toLowerCase() + ' ' + _words[ getRandomWordIndex() ].toLowerCase() + ' ' + _words[ getRandomWordIndex() ].toLowerCase();
  };

  init();
})();
