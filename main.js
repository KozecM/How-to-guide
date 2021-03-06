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
  var thing = [];
  var container = {};
  
  requestify.get('http://api.brewerydb.com/v2/beer/Yq3v6n?key=57ac3d20257053737a469c6962fd60be').then(function(response) {
    // Get the response body (JSON parsed or jQuery object for XMLs)
    response.getBody();
    var everything = JSON.parse(response.body);
    for(var d in everything.data){
        thing.push({'name': d, 'value':everything.data[d]});
        
      }
    console.log(thing);
    container.Listdata = thing;
    console.log(container.Listdata);   
    res.render('API-Step3', container);
  });

});

app.get('/API-Step4',function(req, res){
  res.render('API-Step4');
});

app.get('/API-Step5',function(req, res){
  var holder;
  var container = {};
  requestify.get('http://api.brewerydb.com/v2/beer/Yq3v6n?key=57ac3d20257053737a469c6962fd60be').then(function(response) {
    // Get the response body (JSON parsed or jQuery object for XMLs)
    response.getBody();
    holder = JSON.parse(response.body);
    console.log(holder);
    console.log(holder.data.labels.medium);
    container.logo = holder.data.labels.medium;
    container.name = holder.data.name;
    container.description = holder.data.description;
    container.abv = holder.data.abv;
    container.servtemp = holder.servingTemperature;

    res.render('API-Step5', container);
  });
});

app.get('/End',function(req, res){
  res.render('End');
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
