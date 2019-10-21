var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()
const userRouter = require('./routes/user')

const graphqlHttp = require('express-graphql')
const schema = require('./graphql_schema/schema')

mongoose.connect(process.env.APP_CSAIGMC_DB_URL, {useNewUrlParser: true, useUnifiedTopology: true})
mongoose.connection.once('open', () => {
  console.log("Ready to serve!")
})

var app = express();

app.use(logger('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors())

app.get("/", (req, res) => {
  return res.json({
    "message": "Hi, Welcome to csaigmc."
  })
})

app.use('/user', userRouter)

app.use('/graphql', (req, res) => {
  return graphqlHttp({
    schema,
    graphiql: (process.env.APP_CSAIGMC_MODE === 'dev' ? true : false),
    context: {req}
  })(req, res)
})

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
  res.json({error: `${err.message}`});
});

module.exports = app;
