// modules =================================================
var os             = require('os');
var express        = require('express')
var bodyParser     = require('body-parser')
var methodOverride = require('method-override');
var app            = express();
var hostname       = os.hostname();

// configuration ==========================================
var mongo = require('./app/db/mongo');
var base_url = (hostname.substring(0,5) == 'ersin')? "http://127.0.0.1" : "http://52.35.155.142";
var port = process.env.PORT || 5000;
// get all data/stuff of the body (POST) parameters
app.use(bodyParser.json()); // parse application/json 
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded

app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(express.static(__dirname + '/public')); // set the static files location /public/img will be /img for users

// Add headers
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', base_url + ':' + port);
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
});

// routes ==================================================
require('./app/routes')(app); // pass our application into our routes

// start app ===============================================
mongo.init(function (error) {
  if (error) throw error;
  	app.listen(port);	
	console.log('Magic happens on port ' + port);
	exports = module.exports = app;
});