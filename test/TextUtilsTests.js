var assert = require('assert');
var TextUtils = require('../TextUtils.js');

before(function(){
	tweets = 
		[
			"Hello", 
			"@franky goes to #hollywood. See http://cnn.com.", 
			".@saad @cnn http://cnn.com is down #CNNDown",
			"Meeting a unicorn: TG gets an exclusive meeting with the Nissan GT-R Skyline R33 LM http://www.tpgr.me/XJ05d",//nissan official
			"Deceased Bears fan takes one final shot at Jay Cutler in obituary http://wapo.st/1PoWKsz",//washington post
			"Pain and gain for Chicago teachers in possible 4-year deal. Details: http://goo.gl/VxY9yx",//chicago trib
			".@NatalieMcGarry You don't appear to understand how Twitter or defamation works. I'm going to help you out with the latter.",//jk rowling
			"#@saad @#saad .@saad @http://google.com #http://google.com"
		];
});



describe('TextUtils', function() {
  describe('#getIndividualComponents', function () {
	it('Should split the components into individual strings based on spaces', function () {

		var correctSplits = [
			[ 'Hello' ],
			[ '@franky', 'goes', 'to', '#hollywood.', 'See', 'http://cnn.com.' ],
			[ '.@saad', '@cnn', 'http://cnn.com', 'is', 'down', '#CNNDown' ],
			[ 'Meeting', 'a', 'unicorn:', 'TG', 'gets', 'an', 'exclusive', 'meeting', 'with', 'the', 'Nissan', 'GT-R', 'Skyline', 'R33', 'LM', 'http://www.tpgr.me/XJ05d' ],
			[ 'Deceased', 'Bears', 'fan', 'takes', 'one', 'final', 'shot', 'at', 'Jay', 'Cutler', 'in', 'obituary', 'http://wapo.st/1PoWKsz' ],
			[ 'Pain', 'and', 'gain', 'for', 'Chicago', 'teachers', 'in', 'possible', '4-year', 'deal.', 'Details:', 'http://goo.gl/VxY9yx' ],
			[ '.@NatalieMcGarry', 'You', 'don\'t', 'appear', 'to', 'understand', 'how', 'Twitter', 'or', 'defamation', 'works.', 'I\'m', 'going', 'to', 'help', 'you', 'out', 'with', 'the', 'latter.' ],
			[ "#@saad", "@#saad", ".@saad", "@http://google.com", "#http://google.com"]
		];
 		
		for (var i = 0; i < tweets.length; i++) {
			var indivComponents = TextUtils.getIndividualComponents(tweets[i]);
			assert.equal (indivComponents.length, correctSplits[i].length, 'Tweets[' + i + '] length should be equal');
			for (var j = 0; j < indivComponents.length; j++) {
		  		assert.equal(indivComponents[j], correctSplits[i][j], 'Tweets[' + i + '][' + indivComponents[i] + '] element is equal');
			};
		};


	});
  });
});

describe('TextUtils', function() {
  describe('#isUrl', function () {
	it('Tests whether a string is a url or not', function () {

		var correctAnswers = [

			[ false ],
			[ false, false, false, false, false, true ],
			[ false, false, true, false, false, false ], 
			[ false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true ], 
			[ false, false, false, false, false, false, false, false, false, false, false, false, true ],
			[ false, false, false, false, false, false, false, false, false, false, false, true ],
			[ false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false ],
			[ false, false, false, false, false ] 

		];
 		
 		for (var i = 0; i < tweets.length; i++) {
			var indivComponents = TextUtils.getIndividualComponents(tweets[i]);
			for (var j = 0; j < indivComponents.length; j++) {
		  		assert.equal(TextUtils.isUrl(indivComponents[j]), correctAnswers[i][j], 'Tweets[' + i + '][' + indivComponents[i] + '] element is a url');
			};
		};


	});
  });
});


describe('TextUtils', function() {
  describe('#isTopic', function () {
	it('Tests whether a string is a topic or not', function () {

		var correctAnswers = [

			[ false ],
			[ false, false, false, true, false, false ],
			[ false, false, false, false, false, true ],
			[ false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false ],
			[ false, false, false, false, false, false, false, false, false, false, false, false, false ],
			[ false, false, false, false, false, false, false, false, false, false, false, false ],
			[ false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false ],
			[ false, false, false, false, false ]

		];
 		
 		for (var i = 0; i < tweets.length; i++) {
			var indivComponents = TextUtils.getIndividualComponents(tweets[i]);
			for (var j = 0; j < indivComponents.length; j++) {
		  		assert.equal(TextUtils.isTopic(indivComponents[j]), correctAnswers[i][j], 'Tweets[' + i + '][' + indivComponents[i] + '] element is a topc');
			};
		};
		
		
	});
  });
});


describe('TextUtils', function() {
  describe('#isMention', function () {
	it('Tests whether a string is a url or not', function () {

		var correctAnswers = [

			[ false ],
			[ true, false, false, false, false, false ],
			[ true, true, false, false, false, false ],
			[ false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false ],
			[ false, false, false, false, false, false, false, false, false, false, false, false, false ],
			[ false, false, false, false, false, false, false, false, false, false, false, false ],
			[ true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false ],
			[ false, false, true, false, false ]


		];
 		
 		for (var i = 0; i < tweets.length; i++) {
			var indivComponents = TextUtils.getIndividualComponents(tweets[i]);
			for (var j = 0; j < indivComponents.length; j++) {
		  		assert.equal(TextUtils.isMention(indivComponents[j]), correctAnswers[i][j], 'Tweets[' + i + '][' + indivComponents[j] + '] element is a mention');
			};
		};
		
		
	});
  });
});


describe('TextUtils', function() {
  describe('#processTweet', function () {
	it('Process the tweet by breaking it down to components and checking what type of entity it is', function () {

		var correctAnswers = [

			[ { text: 'Hello', type: 'text' } ],


			[ { text: '@franky', type: 'mention' },
			  { text: 'goes', type: 'text' },
			  { text: 'to', type: 'text' },
			  { text: '#hollywood.', type: 'topic' },
			  { text: 'See', type: 'text' },
			  { text: 'http://cnn.com.', type: 'url' } ],


			[ { text: '.@saad', type: 'mention' },
			  { text: '@cnn', type: 'mention' },
			  { text: 'http://cnn.com', type: 'url' },
			  { text: 'is', type: 'text' },
			  { text: 'down', type: 'text' },
			  { text: '#CNNDown', type: 'topic' } ],


			[ { text: 'Meeting', type: 'text' },
			  { text: 'a', type: 'text' },
			  { text: 'unicorn:', type: 'text' },
			  { text: 'TG', type: 'text' },
			  { text: 'gets', type: 'text' },
			  { text: 'an', type: 'text' },
			  { text: 'exclusive', type: 'text' },
			  { text: 'meeting', type: 'text' },
			  { text: 'with', type: 'text' },
			  { text: 'the', type: 'text' },
			  { text: 'Nissan', type: 'text' },
			  { text: 'GT-R', type: 'text' },
			  { text: 'Skyline', type: 'text' },
			  { text: 'R33', type: 'text' },
			  { text: 'LM', type: 'text' },
			  { text: 'http://www.tpgr.me/XJ05d', type: 'url' } ],


			[ { text: 'Deceased', type: 'text' },
			  { text: 'Bears', type: 'text' },
			  { text: 'fan', type: 'text' },
			  { text: 'takes', type: 'text' },
			  { text: 'one', type: 'text' },
			  { text: 'final', type: 'text' },
			  { text: 'shot', type: 'text' },
			  { text: 'at', type: 'text' },
			  { text: 'Jay', type: 'text' },
			  { text: 'Cutler', type: 'text' },
			  { text: 'in', type: 'text' },
			  { text: 'obituary', type: 'text' },
			  { text: 'http://wapo.st/1PoWKsz', type: 'url' } ],


			[ { text: 'Pain', type: 'text' },
			  { text: 'and', type: 'text' },
			  { text: 'gain', type: 'text' },
			  { text: 'for', type: 'text' },
			  { text: 'Chicago', type: 'text' },
			  { text: 'teachers', type: 'text' },
			  { text: 'in', type: 'text' },
			  { text: 'possible', type: 'text' },
			  { text: '4-year', type: 'text' },
			  { text: 'deal.', type: 'text' },
			  { text: 'Details:', type: 'text' },
			  { text: 'http://goo.gl/VxY9yx', type: 'url' } ],


			[ { text: '.@NatalieMcGarry', type: 'mention' },
			  { text: 'You', type: 'text' },
			  { text: 'don\'t', type: 'text' },
			  { text: 'appear', type: 'text' },
			  { text: 'to', type: 'text' },
			  { text: 'understand', type: 'text' },
			  { text: 'how', type: 'text' },
			  { text: 'Twitter', type: 'text' },
			  { text: 'or', type: 'text' },
			  { text: 'defamation', type: 'text' },
			  { text: 'works.', type: 'text' },
			  { text: 'I\'m', type: 'text' },
			  { text: 'going', type: 'text' },
			  { text: 'to', type: 'text' },
			  { text: 'help', type: 'text' },
			  { text: 'you', type: 'text' },
			  { text: 'out', type: 'text' },
			  { text: 'with', type: 'text' },
			  { text: 'the', type: 'text' },
			  { text: 'latter.', type: 'text' } ],


			[ { text: '#@saad', type: 'text' },
			  { text: '@#saad', type: 'text' },
			  { text: '.@saad', type: 'mention' },
			  { text: '@http://google.com', type: 'text' },
			  { text: '#http://google.com', type: 'text' } ]				
		];
 		
 		console.log();
 		console.log();

 		for (var i = 0; i < tweets.length; i++) {
 			assert.equal( JSON.stringify(TextUtils.processTweet(tweets[i])),
 						  JSON.stringify(correctAnswers[i]),
 						  'Tweets['+i+'] is not processed properly'
 						);
 		};
		
	});
  });
});



