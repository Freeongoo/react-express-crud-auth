const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');

const monk = require('monk');
const conn = require('./db/conn');
const db = monk(conn.url);

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();
app.use(bodyParser.urlencoded({extended: true}))

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

// add from middleware db in request
app.use(function(req, res, next){
    req.db = db;
    next();
});

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.json({
        message: err.message,
        error: err
    })
});

module.exports = app;
