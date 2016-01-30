
/**
 * This "Class" is basically the heart of the engine.
**/
var TextUtils = {

	/**
	 * This breaks the full tweet text into indivual components and returns an array of the components
	 * Basically a glorified explode functions
	 * 
	 * @param fullText -> the tweet
	 * @return -> array
	 * Example:
	 *	getIndividualComponents('@saad hello @john') -> ['@saad', 'hello', '@john'];
	**/
	getIndividualComponents: function (fullText){
		return fullText.split(" ");
	}
}


//actually return the "class" when require is called.
module.exports = TextUtils;