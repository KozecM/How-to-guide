var requestify = require('requestify');
var http = require('http');
var express = require('express');
var path = require('path');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 3000);

requestify.get('http://api.brewerydb.com/v2/beer/Yq3v6n?key=57ac3d20257053737a469c6962fd60be').then('/API-Step3', function(response) {
    // Get the response body (JSON parsed or jQuery object for XMLs)
    response.getBody();
    var stuff = [];
    var type = {};

    for (var f in response){
      stuff.push({'name': f, 'value':response[f]}})
    }
    type.Listdata = stuff;
    response.render('API-Step3', type);
    });

app.get('/',function(req, res){
  res.render('index');
});

app.get('/index',function(req, res){
	res.render('index');
});

app.get('/API-Step1',function(req, res){
	res.render('API-Step1');
});

app.get('/API-Step2',function(req, res){
	res.render('API-Step2');
});

app.get('/API-Step3',function(req, res){
	res.render('API-Step3');
});

app.get('/API-Step4',function(req, res){
  res.render('API-Step4');
});

app.get('/API-Step5',function(req, res){
  res.render('API-Step5');
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
