const ResponseUtil = require("./app/util/ResponseUtil")
const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const bodyParser = require('body-parser')
const swaggerUi = require('swagger-ui-express')
const monk = require('monk')

const swaggerDocument = require('./swagger.json')
const conn = require('./db/conn')
const db = monk(conn.url)

const indexRouter = require('./app/routes/indexRouter')
const usersRouter = require('./app/routes/usersRouter')

const app = express()
app.use(bodyParser.urlencoded({extended: true}))

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cookieParser())

// add from middleware db in request
app.use(function(req, res, next){
    req.db = db
    next()
})

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/', indexRouter)
app.use('/users', usersRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
    let isDev = req.app.get('env') === 'development'

    // set locals, only providing error in development
    res.locals.message = err.message
    res.locals.error = isDev ? err : {}

    ResponseUtil.sendExceptionResponse(req, res, err)
})

module.exports = app
