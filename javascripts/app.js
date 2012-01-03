var WordSmasher = (function(){
	// App properties
	// ------------------------------------------------------------------------
	var _words = [];
  var _vowels = ['a','e','i','o','u'];
  var _sampleWords = 'aardvark, alligator, alpaca, anteater, antelope, ape, armadillo, baboon, badger, bat, bear, beaver, bighorn, bison, boar, buffalo, bull, bunny, camel, canary, capybara, cat, chameleon, cheetah, chimpanzee, chinchilla, chipmunk, cougar, cow, coyote, crocodile, crow, deer, dingo, dog, donkey, duckbill, elephant, elk, fawn, ferret, finch, fish, fox, frog, gazelle, giraffe, goat, gopher, gorilla, grizzly bear, ground hog, guinea pig, hamster, hedgehog, hippopotamus, horse, hyena, iguana, impala, jaguar, kangaroo, kitten, koala, lamb, lemur, leopard, lion, lizard, llama, lynx, marmoset, mole, mongoose, monkey, moose, mountain goat, mouse, mule, muskrat, newt, opossum, orangutan, otter, panda, panther, parakeet, parrot, pig, platypus, polar bear, porcupine, porpoise, prairie dog, rabbit, raccoon, rat, reindeer, rhinoceros, salamander, seal, sheep, skunk, sloth, snake, squirrel, stallion, tiger, toad, turtle, walrus, weasel, whale, wildcat, wolf, wombat, woodchuck, yak, zebra';
		
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
      if( _words.length > 0 ) getRandomName();
    });
    $('#sample').bind('click',function(e){
      e.preventDefault();
      $('#word_input').val( _sampleWords );
      setTimeout(function(){
        createWordList();
        if( _words.length > 0 ) getRandomName();
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
      if( _words.indexOf( inputWords[i] ) == -1 && inputWords[i].length > 2 && getVowelPositions( inputWords[i] ).length > 0 ) {
        _words.push( inputWords[i] );
      }
    }
    
    // display words and clear the input
    $('#words').text(_words.join(', '));
    $('#word_input').val('');
	};
	
	// Get a random index
	// ------------------------------------------------------------------------
	var getRandomIndex = function() {
		return Math.round( Math.random() * (_words.length - 1) );
	};
	
	// Combine 2 words on a random vowel
	// ------------------------------------------------------------------------
	var smashWords = function() {
    var word1 = _words[getRandomIndex()];
    var word2 = _words[getRandomIndex()];
    
    var word1Vowels = getVowelPositions( word1 );
    var word2Vowels = getVowelPositions( word2 );
    
    // if first word has more than one vowel, and the first letter is a vowel, get rid of it. same for the end of the 2nd word. this ensures a more substantial piece of the word remains.
    if( word1Vowels.length > 1 && word1Vowels[ 0 ] == 0 ) word1Vowels.shift();
    if( word2Vowels.length > 1 && word2Vowels[ word2Vowels.length - 1 ] == word2.length - 1 ) word2Vowels.pop();

    // pick a random vowel to split on
    word1vowelStop = word1Vowels[ Math.round(Math.random() * ( word1Vowels.length - 1 ) ) ];
    word2vowelStop = word2Vowels[ Math.round(Math.random() * ( word2Vowels.length - 1 ) ) ];
    
    // replace the split vowel with an underlined version
    var outputWord1 = replaceLetterWithSpan( word1, word1vowelStop );
    var outputWord2 = replaceLetterWithSpan( word2, word2vowelStop );

    // 
    if( ( word1vowelStop != 0 && word2vowelStop != 0 ) || word1vowelStop == 0 ) {
      if( Math.random() > 0.5 ) {
        word1vowelStop++;
        word2vowelStop++;
      }
    }
    
    var result = outputWord1 + ' + ' + outputWord2 + ' = <u>' + word1.substr(0,word1vowelStop) + word2.substr(word2vowelStop) + '</u>';
    return result.toLowerCase();
	};
	
	// Returns an aray of vowel indexes in a word
	// ------------------------------------------------------------------------
	var getVowelPositions = function( word ) {
	  var positions = [];
	  var i = 0;
	  for( var charPos in word ) {
      if( charIsVowel( word[charPos] ) ) positions.push( i );
      i++;
    }
    return positions;
	};
	
	// Returns an aray of vowel indexes in a word
	// ------------------------------------------------------------------------
	var charIsVowel = function( char ) {
	  return ( _vowels.indexOf( char ) != -1 );
	};
	
	// Returns an aray of vowel indexes in a word
	// ------------------------------------------------------------------------
	var replaceLetterWithSpan = function( word, index ) {
	  return word.substr( 0, index ) + '<u>' + word.charAt( index ) + '</u>' + word.substr( index + 1 );
	};
	
	// Output word combos
	// ------------------------------------------------------------------------
	var getRandomName = function() {
	  $('#result').show();
		document.getElementById('result_combo').innerHTML = _words[ getRandomIndex() ].toLowerCase() + ' ' + _words[ getRandomIndex() ].toLowerCase() + ' ' + _words[ getRandomIndex() ].toLowerCase();
		document.getElementById('result_smash').innerHTML = smashWords();
	};
	
	
	init();
})();
