var requestify = require('requestify');
var http = require('http');
var express = require('express');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 3000);

requestify.get('http://api.brewerydb.com/v2/beer/Yq3v6n?key=57ac3d20257053737a469c6962fd60be').then(function(response) {
    // Get the response body (JSON parsed or jQuery object for XMLs)
    response.getBody();
    console.log(response);
    });
app.get('/index',function(req, res){
	res.render('index');
});

app.get('/API-Step1',function(req, res){
	res.render('API-Step1');
});

app.get('/',function(req, res){
	res.render('index');
});

app.get('/',function(req, res){
	res.render('index');
});


app.use(function(req,res){
  res.status(404);
  res.render('404');
});


app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
