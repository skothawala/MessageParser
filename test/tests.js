var assert = require('assert');
var TextUtils = require('../TextUtils.js');

var tweets = [
				"Hello", 
				"@franky goes to #hollywood. See http://cnn.com.", 
				".@saad @cnn http://cnn.com is down",
				"Meeting a unicorn: TG gets an exclusive meeting with the Nissan GT-R Skyline R33 LM http://www.tpgr.me/XJ05d",//nissan official
				"Deceased Bears fan takes one final shot at Jay Cutler in obituary http://wapo.st/1PoWKsz",//washington post
				"Pain and gain for Chicago teachers in possible 4-year deal. Details: http://goo.gl/VxY9yx",//chicago trib
				".@NatalieMcGarry You don't appear to understand how Twitter or defamation works. I'm going to help you out with the latter."//jk rowling
			 ];

describe('TextUtils', function() {
  describe('#getIndividualComponents', function () {
    it('Should split the components into individual strings based on spaces', function () {

    	var correctSplits = [
    		[ 'Hello' ],
			[ '@franky', 'goes', 'to', '#hollywood.', 'See', 'http://cnn.com.' ],
			[ '.@saad', '@cnn', 'http://cnn.com', 'is', 'down' ],
			[ 'Meeting', 'a', 'unicorn:', 'TG', 'gets', 'an', 'exclusive', 'meeting', 'with', 'the', 'Nissan', 'GT-R', 'Skyline', 'R33', 'LM', 'http://www.tpgr.me/XJ05d' ],
			[ 'Deceased', 'Bears', 'fan', 'takes', 'one', 'final', 'shot', 'at', 'Jay', 'Cutler', 'in', 'obituary', 'http://wapo.st/1PoWKsz' ],
			[ 'Pain', 'and', 'gain', 'for', 'Chicago', 'teachers', 'in', 'possible', '4-year', 'deal.', 'Details:', 'http://goo.gl/VxY9yx' ],
			[ '.@NatalieMcGarry', 'You', 'don\'t', 'appear', 'to', 'understand', 'how', 'Twitter', 'or', 'defamation', 'works.', 'I\'m', 'going', 'to', 'help', 'you', 'out', 'with', 'the', 'latter.' ]
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