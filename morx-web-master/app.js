var mosh       = require('mosh');
var models     = require('./models');
var express    = require('express');
var appConfig  = require('./config/app');
var bodyParser = require('body-parser');

var app    = express();
var routes = require('./routes');


app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(routes); //Web routes
/*
Handle 404
*/

//Start app
//can do stuff like sync models or any other thing needing bootstrap before listening
app.listen(appConfig.port);