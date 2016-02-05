var http = require('http');
var formidable = require('formidable');
var TextUtils = require('./TextUtils.js');

var htmlHead = '<!DOCTYPE html><html lang="en"><head><!-- view-source:https://ironsummitmedia.github.io/startbootstrap-bare/ --> <meta charset="utf-8"> <meta http-equiv="X-UA-Compatible" content="IE=edge"> <meta name="viewport" content="width=device-width, initial-scale=1"> <meta name="description" content=""> <meta name="author" content=""> <title>Tweet Processor</title> <!-- Bootstrap Core CSS --> <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" rel="stylesheet"> <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries --> <!-- WARNING: Respond.js doesn\'t work if you view the page via file:// --> <!--[if lt IE 9]> <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script> <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script> <![endif]--></head><body> <nav class="navbar navbar-inverse navbar-fixed-top" role="navigation"> <div class="container"> <div class="navbar-header"> <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1"> <span class="sr-only">Toggle navigation</span> <span class="icon-bar"></span> <span class="icon-bar"></span> <span class="icon-bar"></span> </button> <a class="navbar-brand" href="/">Tweet Processor</a> </div><div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1"> <ul class="nav navbar-nav"> <li> <a href="/">Home</a> </li><li> <a href="https://github.com/skothawala/MessageParser">Code</a> </li></ul> </div></div></nav><div class="container" style="padding-top:100px;">';
var innerHtml = '<p>This application processes tweets similar to how twitter does it in house. Basically it categorizes each spaced word in the tweet as a mention, topic or url.</p><div class="row"><form action="/analyze" method="post" enctype="multipart/form-data"><div class="col-md-10"><textarea style="resize:vertical;" rows="10" class="form-control" placeholder="Enter each tweet on a new line" name="tweets" value=""></textarea></div><div class="col-md-2"><input type="submit" class="btn btn-success" value="Analyze"></div></form></div>';
var htmlFoot = '<footer class="footer" style="position:absolute; bottom:0"><div class="container"><p class="text-muted">Copyright 2016 <a href="https://www.linkedin.com/in/saad-kothawala-1b0787a1">Saad Kothawala</a></p></div></footer></div><!-- jQuery Version 1.11.1 --> <script src="https://code.jquery.com/jquery-2.2.0.min.js"></script> <!-- Bootstrap Core JavaScript --> <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script></body></html>';

//handles errors
handleError = function (err, res){
	res.writeHead(200, {'content-type': 'text/html'});
	res.write(htmlHead);
	res.write('<span style="color:red; font-size:18px">Error: ' + err + "</span>");
	res.write(innerHtml);
	res.end(htmlFoot);
}

//handles successfully posted
handleSuccess = function (allInput, processedTweets, res){
	res.writeHead(200, {'content-type': 'text/html'});
	res.write(htmlHead);
	res.write('<p>Input: </p><pre>' + allInput + '</pre>');
	res.write('<table class="table table-hover"><thead><tr><th>Tweet</th><th>Mentions</th><th>Topics</th><th>Links</th><th>Full Return</th></tr></thead><tbody>')

	var tweets = allInput.split("\r\n");
	
	for (var i = 0; i < tweets.length; i++) {
		var mentions = "";
		var topics = "";
		var links = "";
		for (var j = 0; j < processedTweets[i].length; j++) {
			switch(processedTweets[i][j].type){
				case 'mention':
					mentions += processedTweets[i][j].text + "<br>";break;
				case 'topic':
					topics += processedTweets[i][j].text + "<br>";break;
				case 'url':
					links += processedTweets[i][j].text + "<br>";break;
				default:
					break;
			}
		};
		res.write('<tr>');
			res.write('<td>');
			res.write(tweets[i]);
			res.write('</td>');
			res.write('<td>');
			res.write(mentions);
			res.write('</td>');
			res.write('<td>');
			res.write(topics);
			res.write('</td>');
			res.write('<td>');
			res.write(links);
			res.write('</td>');
			res.write('<td>');
			res.write(JSON.stringify(processedTweets[i]));//res.write needs to be string
			res.write('</td>');
		res.write('</tr>');
	};
	res.write('</tbody></table>');
	res.write(innerHtml);
	res.end(htmlFoot);

}

//handles all requests
requestHandler = function (req, res) {
	
	if (req.url === '/analyze' && req.method.toLowerCase() === 'post') {
		var form = new formidable.IncomingForm();

		form.parse(req, function(err, fields, files) {
			if(fields.length == 0 || fields.tweets.length == 0)
				return handleError('Nothing inputed', res);

			var tweets = fields.tweets.split("\r\n");

			var processedTweets = [];

			for (var i = 0; i < tweets.length; i++) {
				processedTweets.push(TextUtils.processTweet(tweets[i]));
			};

			return handleSuccess(fields.tweets, processedTweets, res);
		});

	}else{
		res.writeHead(200, {'content-type': 'text/html'});
		res.end(htmlHead + innerHtml + htmlFoot);
	}

	

};


var port = process.env.PORT || 8080;//for heroku (in future)
var server = http.createServer(requestHandler);
server.listen(port);

console.log('Listening on ' + port);
