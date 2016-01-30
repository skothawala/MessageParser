
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
	},
	/**
	 * Checks if the input is a url
	 * 
	 * @param text -> the url?
	 * @return -> boolean
	 * Example:
	 *	isUrl('http://www.tpgr.me/XJ05d') -> true;
	**/
	isUrl: function(text){
		if(text.charAt(0) == '@' || text.charAt(0) == '#')
			return false;

		//regex from Android http://grepcode.com/file/repository.grepcode.com/java/ext/com.google.android/android/2.0_r1/android/text/util/Regex.java#Regex.0WEB_URL_PATTERN
		var isUrl = text.match(/((?:(http|https|Http|Https|rtsp|Rtsp):\/\/(?:(?:[a-zA-Z0-9\$\-\_\.\+\!\*\'\(\)\,\;\?\&\=]|(?:\%[a-fA-F0-9]{2})){1,64}(?:\:(?:[a-zA-Z0-9\$\-\_\.\+\!\*\'\(\)\,\;\?\&\=]|(?:\%[a-fA-F0-9]{2})){1,25})?\@)?)?((?:(?:[a-zA-Z0-9][a-zA-Z0-9\-]{0,64}\.)+(?:(?:aero|arpa|asia|a[cdefgilmnoqrstuwxz])|(?:biz|b[abdefghijmnorstvwyz])|(?:cat|com|coop|c[acdfghiklmnoruvxyz])|d[ejkmoz]|(?:edu|e[cegrstu])|f[ijkmor]|(?:gov|g[abdefghilmnpqrstuwy])|h[kmnrtu]|(?:info|int|i[delmnoqrst])|(?:jobs|j[emop])|k[eghimnrwyz]|l[abcikrstuvy]|(?:mil|mobi|museum|m[acdghklmnopqrstuvwxyz])|(?:name|net|n[acefgilopruz])|(?:org|om)|(?:pro|p[aefghklmnrstwy])|qa|r[eouw]|s[abcdeghijklmnortuvyz]|(?:tel|travel|t[cdfghjklmnoprtvwz])|u[agkmsyz]|v[aceginu]|w[fs]|y[etu]|z[amw]))|(?:(?:25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}|[1-9][0-9]|[1-9])\.(?:25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}|[1-9][0-9]|[1-9]|0)\.(?:25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}|[1-9][0-9]|[1-9]|0)\.(?:25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}|[1-9][0-9]|[0-9])))(?:\:\d{1,5})?)(\/(?:(?:[a-zA-Z0-9\;\/\?\:\@\&\=\#\~\-\.\+\!\*\'\(\)\,\_])|(?:\%[a-fA-F0-9]{2}))*)?(?:\b|$)/gi);
		
		return isUrl != null;
	},

	/**
	 * This is the "main" function of this class. This is what the user calls from outside. Basically,
	 * we take a tweet and then process it and return the tweet as an array of json objects containing it's classification
	 * 
	 * 
	 * @param tweet -> the tweet
	 * @return -> array
	 * Example:
	 *	processTweet('@saad hello @john, visit http://google.com #awesome') -> 
	 *		[{text: '@saad', type: 'mention'}, 
	 		{text: 'hello', type: 'text'}, 
	 		{text: '@john', type: 'mention'}, 
	 		{text: 'visit', type: 'text'}, 
	 		{text: 'http://google.com', type: 'url'},	 		
	 		{text: '#awesome', type: 'mention'}];
	**/
	processTweet: function (tweet){
		//1st we split the string by spaces

		var components = TextUtils.getIndividualComponents(tweet);
		for (var i = 0; i < components.length; i++) {
			components[i]
		};
	}
}


//actually return the "class" when require is called.
module.exports = TextUtils;