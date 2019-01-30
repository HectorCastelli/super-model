var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var sassMiddleware = require('node-sass-middleware');
var bodyParser = require('body-parser');
var favicon = require('serve-favicon');

var config = require('./config/config.json');
var markdown = require('markdown-it');

/* Routes */
var indexRouter = require('./routes/index');
var blogRouter = require('./routes/blog');
var gameRouter = require('./routes/game');

var db = require('./database/dbconnection.js');

var app = express();

app.locals.config = config;
// Set moment available everywhere (including pug templates)
app.locals.moment = require('moment');
// Set db accesible everywhere
app.locals.db = db;
// Set markdown available everywhere
app.locals.markdown = new markdown();
// Set games list available everywhere
db.game.findAll({where: {active: true}}).then(response => {
  app.locals.games = response;
});
// Set social network list available everywhere
db.socialNetwork.findAll().then(response => {
  app.locals.networks = response;
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: false, // true = .sass and false = .scss
  sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', express.static(path.join(__dirname, 'public')));
//app.use(favicon(path.join(__dirname, 'public/images', 'favicon.ico')));

app.use('/', indexRouter);
app.use('/blog', blogRouter);
app.use('/game', gameRouter);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
