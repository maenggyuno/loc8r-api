//14장 37p
require('dotenv').config();

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// 7장 13p 추가함, 9장 31p에서 삭제 주석처리
// require('./app_server/models/db');

// 9장 31p 1줄 추가함
require('./app_api/models/db');

//var indexRouter = require('./routes/index');
//var usersRouter = require('./routes/users');
//const indexRouter = require('/app_server/routes/index'); 7-8을 주석처리 하고 4강 7페이지 처럼 10과 11을 2줄 추가함
const indexRouter = require('./app_server/routes/index');
const usersRouter = require('./app_server/routes/users');

// 9장 21p 1줄 추가함
const apiRouter = require('./app_api/routes/index');

var app = express();

// view engine setup
//app.set('views', path.join(__dirname, 'views'));
app.set('views', path.join(__dirname, 'app_server', 'views'));
//app.set('views', path.join(_dirname, 'app_server', 'views'));를 13줄을 주석처리 하고 4강 7페이지처럼 추가함
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// 9장 22p 1줄 추가함
app.use('/api', apiRouter);

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
