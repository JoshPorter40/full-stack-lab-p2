var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var clientPath = path.join(__dirname, '../client');
var api = require('./api');
var cookieParser = require('cookie-parser');
var prerender = require('prerender-node');
var configurePassport = require('./config/passport');
var routing = require('./middleware/routing.mw');

prerender.set('prerenderToken', process.env.PRERENDER_TOKEN);

var app = express();
app.use(prerender);
app.use(express.static(clientPath));
app.use(cookieParser());
app.use(bodyParser.json());
app.use('/api', api);

configurePassport(app);
app.get('*', routing.stateRouting);
app.listen(process.env.PORT || 3000);