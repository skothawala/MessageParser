var http = require('http');
var TextUtils = require('./TextUtils.js');

var htmlHead = '<!DOCTYPE html><html lang="en"><head><!-- view-source:https://ironsummitmedia.github.io/startbootstrap-bare/ --> <meta charset="utf-8"> <meta http-equiv="X-UA-Compatible" content="IE=edge"> <meta name="viewport" content="width=device-width, initial-scale=1"> <meta name="description" content=""> <meta name="author" content=""> <title>Tweet Processor</title> <!-- Bootstrap Core CSS --> <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" rel="stylesheet"> <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries --> <!-- WARNING: Respond.js doesn\'t work if you view the page via file:// --> <!--[if lt IE 9]> <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script> <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script> <![endif]--></head><body> <nav class="navbar navbar-inverse navbar-fixed-top" role="navigation"> <div class="container"> <div class="navbar-header"> <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1"> <span class="sr-only">Toggle navigation</span> <span class="icon-bar"></span> <span class="icon-bar"></span> <span class="icon-bar"></span> </button> <a class="navbar-brand" href="/">Tweet Processor</a> </div><div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1"> <ul class="nav navbar-nav"> <li> <a href="/">Home</a> </li></ul> </div></div></nav><div class="container" style="padding-top:100px;">';
var innerHtml = '<h1>Hello</h1>';
var htmlFoot = '</div><!-- jQuery Version 1.11.1 --> <script src="https://code.jquery.com/jquery-2.2.0.min.js"></script> <!-- Bootstrap Core JavaScript --> <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script></body></html>';


//handles all requests
requestHandler = function (req, res) {
 
	res.writeHead(200, {'content-type': 'text/html'});
	res.end(htmlHead + innerHtml + htmlFoot);

};


var port = process.env.PORT || 8080;//for heroku (in future)
var server = http.createServer(requestHandler);
//server.listen(port);

//console.log('Listening on ' + port);



console.log(TextUtils.isMention('@saad'));