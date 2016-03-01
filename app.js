//Getting a number of packages needed for my web application, with these I can 
// access functionality such as making cookies, parsing in JSON, stating the web 
// application need to get express so later I can state that my app is creating 
// an app based on the express library
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// Creating a variable equal to getting routes/index. This is used so a the web 
// application can use the routes package of node and this line is used to tell 
// node to in a way expect/look for code in the index file of the directroy routes, 
// without this I would not be able to direct the server to look at my index.js file 
// for my written functionality such as getting/posting to pages
var routes = require('./routes/index');
//var users = require('./routes/users');

// Creating a variable called session, this code is for me to be able to sessions 
// in my app as I want to be able to store the users activities, eg. when they 
// enter the app their secrets are still present as long as they are logged into 
// the right user
var session = require('express-session');

// Making the app variable equal to express. This is used to allow me to create 
// an express app, code in it and tell the app it needs to use express
var app = express();

// This is telling the web application to set the following as the view engine setup
// I am using it to tell the application to look for my different pages/views of different 
// pages in a folder called views, 
app.set('views', path.join(__dirname, 'views'));

// This line tells the node app that jade is to be used as the template engine
// Which means the html will be based off of the framework of jade instead of 
// needing to code it in html, jade is easier to use in conjunction with node 
// and express. I am using this line so i can code my webpages as jade files 
// instead of html
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

////////////////////////////////////////////////////////
// Part of my session code before moving past 
// it in order to get basic functionality working first

// Setting up the express session
/*
var expressSessionOptions = {
  secret:'mySecret',
  resave: false,
  saveUninitialized: false
}
app.use(session(expressSessionOptions));
*/

///////////////////////////////////////////////////////

app.use('/', routes);
//app.use('/users', users);

/*
  This is a line, that when you inspect the html 
  of the page in the broswer it makes easily reable, 
  without this my html code would be minified and very 
  hard to understand. I am using this to make sure that
  my html is being outputted corectly and it is easier 
  for me to tell which elements are being affected how. 
  i.e if there are nested elements.
  */
app.locals.pretty = true;

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
