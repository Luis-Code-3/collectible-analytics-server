var createError = require('http-errors')
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var cors = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var tcgRotuer = require('./routes/tcg');
var videogamesRouter = require('./routes/videogames');
var mangaRouter = require('./routes/manga');
var sportcardRouter = require('./routes/sportcard');
var searchRouter = require('./routes/search');
var watchlistRouter = require('./routes/watchlist')
var collectionRouter = require('./routes/collection')

var app = express();

app.set('trust proxy', 1);
app.enable('trust proxy');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(
    cors({
      origin: [process.env.FRONTEND_URI]  // <== URL of our future React app
    })
);

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/tcg', tcgRotuer);
app.use('/videogames', videogamesRouter);
app.use('/manga', mangaRouter);
app.use('/sportcards', sportcardRouter);
app.use('/search', searchRouter);
app.use('/watchlist', watchlistRouter);
app.use('/collection', collectionRouter);

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

mongoose
  .connect(process.env.MONGODB_URI)
  .then((x) => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`);
  })
  .catch((err) => {
    console.error("Error connecting to mongo: ", err);
  });

module.exports = app;
