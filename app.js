'use strict';

var http = require('http');
var express = require('express');
var WebSocketServer = require('ws').Server;

var app = express();
var development = app.get('env') === 'development';

// Set the view engine
app.set('view engine', 'jade');

app.use(express.static(process.cwd() + '/public'));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler for both production and development
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    path: process.cwd(),
    message: err.message,
    error: (development) ? err : {}
  });
});

var server = http.createServer(app);
server.listen(process.env.PORT || 3000, function () {
  console.log('Server listening on ' + process.env.PORT || 3000);
});
