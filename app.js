var express     = require('express'),
	http          = require('http'),
	pjson         = require('./package.json'),
  ajaxfunctions = require('./lib/ajax'),
  fs            = require('fs');


var app = express();


app.configure(function() {
  app.set('port',process.env.PORT || 1984);
  app.use(express.favicon());
  app.use('/static',express.static(__dirname + '/static'));
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade'); 
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('Usishi".2012'));
  app.use(express.session({cookie:{ maxAge:60000*60*24*7 }}));
  app.use(app.router);   
});


app.get('/pg/:page',function(req,res){
  res.render(req.params.page,{});
});

app.get('/',function(req,res){
  res.render('index',{});
});


app.all('/ajax/:question',ajaxfunctions.ask);


http.createServer(app).listen(app.get('port'), function(){
  var date= new Date();
  console.log("\033[41m\033[33m >> "+date+" : "+pjson.name+'_'+pjson.version+" listening on port " + app.get('port')+"\033[0m");
});  



        