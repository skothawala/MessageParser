
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
	 * @return -> [boolean, url]
	 *	return[0] is if the input is a url
	 *	return[1] contains the actual url
	 *		Not really needed here bit needs to be consistent with isTopic and isMention
	 * Example:
	 *	isUrl('http://www.tpgr.me/XJ05d') -> true;
	**/
	isUrl: function(text){
		if(text.charAt(0) == '@' || text.charAt(0) == '#')
			return [false, null];

		//regex from Android http://grepcode.com/file/repository.grepcode.com/java/ext/com.google.android/android/2.0_r1/android/text/util/Regex.java#Regex.0WEB_URL_PATTERN
		var match = text.match(/((?:(http|https|Http|Https|rtsp|Rtsp):\/\/(?:(?:[a-zA-Z0-9\$\-\_\.\+\!\*\'\(\)\,\;\?\&\=]|(?:\%[a-fA-F0-9]{2})){1,64}(?:\:(?:[a-zA-Z0-9\$\-\_\.\+\!\*\'\(\)\,\;\?\&\=]|(?:\%[a-fA-F0-9]{2})){1,25})?\@)?)?((?:(?:[a-zA-Z0-9][a-zA-Z0-9\-]{0,64}\.)+(?:(?:aero|arpa|asia|a[cdefgilmnoqrstuwxz])|(?:biz|b[abdefghijmnorstvwyz])|(?:cat|com|coop|c[acdfghiklmnoruvxyz])|d[ejkmoz]|(?:edu|e[cegrstu])|f[ijkmor]|(?:gov|g[abdefghilmnpqrstuwy])|h[kmnrtu]|(?:info|int|i[delmnoqrst])|(?:jobs|j[emop])|k[eghimnrwyz]|l[abcikrstuvy]|(?:mil|mobi|me|museum|m[acdghklmnopqrstuvwxyz])|(?:name|net|n[acefgilopruz])|(?:org|om)|(?:pro|p[aefghklmnrstwy])|qa|r[eouw]|s[abcdeghijklmnortuvyz]|(?:tel|travel|t[cdfghjklmnoprtvwz])|u[agkmsyz]|v[aceginu]|w[fs]|y[etu]|z[amw]))|(?:(?:25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}|[1-9][0-9]|[1-9])\.(?:25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}|[1-9][0-9]|[1-9]|0)\.(?:25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}|[1-9][0-9]|[1-9]|0)\.(?:25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}|[1-9][0-9]|[0-9])))(?:\:\d{1,5})?)(\/(?:(?:[a-zA-Z0-9\;\/\?\:\@\&\=\#\~\-\.\+\!\*\'\(\)\,\_])|(?:\%[a-fA-F0-9]{2}))*)?(?:\b|$)/gi);
		
		return match != null ? [true, text] : [false, null];
	},
	/**
	 * Checks if the input is a topic/hashtag
	 * 
	 * @param text -> the topic?
	 * @return -> [boolean, topic]
	 *	return[0] is if the input contains a topic
	 *	return[1] contains the actual valid topic (#####qwr23_32423 is a topic as: #qwr23_32423)
	 *		default: null
	 * Example:
	 *	isTopic('#google') -> true;
	**/
	isTopic: function(text){

		var validTopic = text.length > 1 && text.indexOf('#') > -1 && !TextUtils.isUrl(text.substr(1, text.length))[0];
						
		if(!validTopic)
			return [false, null];

		var regMatch = text.match(/.?#([a-zA-Z0-9-_]*)/gi);

		var lastMatch = regMatch[regMatch.length - 1];
		if(
			lastMatch.length > 1 
			&& !TextUtils.isMention(lastMatch)[0]
		)
			return [true, lastMatch];
		else
			return [false, null];

		


		/*return text.length > 1 && text.charAt(0) == '#'  
			&& ( 
				((text.charCodeAt(1)  >= 65) && (text.charCodeAt(1)  <= 90)) || 
				((text.charCodeAt(1)  >= 97) && (text.charCodeAt(1)  <= 122)) 
			)
			&& !TextUtils.isUrl(text.substr(1, text.length))
			&& !TextUtils.isMention(text.substr(1, text.length));*/
	},
	/**
	 * Checks if the input is a mention. It does this by checking if the text after the @ is a valid
	 * username (Twitter usernames (and hence mentions) can only contain letters, numbers and '_')
	 * 
	 * Also, I'm excluding punctuation from here. Also, urls are not cosndiered mentions.
	 *	However, isUrl automatically returns false if the first character is a # or @. 
	 *	Therefore, I am using isUrl with .substr(1, length); e.g. excluding the first character
	 * 
	 * @param text -> the mention?
	 * @return -> [boolean, mention]
	 *	return[0] is if the input contains a mention
	 *	return[1] contains the actual valid mention (e.g. @saad! = @saad)
	 *		default: null
	 * Example:
	 *	isMention('@saad') -> true;
	**/
	isMention: function(text){

		//valid in front: \-\=\[\;\'\/\.\]\[\^\(\)\\\|\]\{\}\[\"\'\:\;\?\/\>\.\<\,\~\`


		if(text.length > 1 && text[0].match(/([\-\=\[\;\'\/\.\]\[\^\(\)\\\|\]\{\}\[\"\'\:\;\?\/\>\.\<\,\~\`])/gi))
			text = text.substr(1, text.length);

		var validMention = text.length > 1 && text.charAt(0) == '@' && !TextUtils.isUrl(text.substr(1, text.length))[0];
						
		if(!validMention)
			return [false, null];
	
		var regMatch = text.match(/.?@([a-zA-Z0-9-_]*)/gi);

		var lastMatch = regMatch[regMatch.length - 1];
		if(
			lastMatch.length > 1 &&
			lastMatch.split("@").length < 3
		)
			return [true, lastMatch];
		else
			return [false, lastMatch.split("@")];		

		/*return [text.length > 1 && 
				text.length < 21 && text.charAt(0) == '@' && !(TextUtils.isUrl(text.substr(1, text.length))[0])
				&& ( 
					((text[1] >= 0) && (text[1] <= 9)) || 
					((text.charCodeAt(1)  >= 65) && (text.charCodeAt(1)  <= 90)) || 
					((text.charCodeAt(1)  >= 97) && (text.charCodeAt(1)  <= 122)) 
				), text];
				/*&& text.match(/([A-Za-z0-9_-]+)/gi)[0] == text.substr(1, text.length)*/				
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
		var toReturn = [];

		var components = TextUtils.getIndividualComponents(tweet);
		for (var i = 0; i < components.length; i++) {
			if(TextUtils.isMention(components[i])[0])
				toReturn.push({text: components[i], type: 'mention'});
			else if(TextUtils.isTopic(components[i])[0])
				toReturn.push({text: components[i], type: 'topic'});
			else if(TextUtils.isUrl(components[i])[0])
				toReturn.push({text: components[i], type: 'url'});
			else
				toReturn.push({text: components[i], type: 'text'});
		};

		return toReturn;
	}
}


//actually return the "class" when require is called.
module.exports = TextUtils;
