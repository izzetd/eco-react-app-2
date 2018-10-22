var express = require('express');
var path = require('path');
// var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// Mongo setup
var mongo = require('mongodb');
var monk = require('monk');
var db = monk('mongo:27017/nodetest1');

var routes = require(path.join(__dirname, "/routes/index.js"));

var app = express();
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// static sources
app.use(express.static(path.join(__dirname, "/../client/dist")));

// Make our db accessible to our router
app.use(function(req,res,next){
    req.db = db;
    next();
});

// Routes under /server/routs/index.js
app.use('/', routes);

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

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

var kafka = require('kafka-node');
var Consumer = kafka.Consumer;
var Client = kafka.Client;

var client = new Client('zookeeper:2181');
var topics = [{
  topic: 'nodetest1.nodetest1.usercollection'
}];

var lastUser;

var options = {
    autoCommit: true,
    fetchMaxWaitMs: 1000,
    fetchMaxBytes: 1024 * 1024,
    encoding: 'buffer'
  };
  var consumer = new Consumer(client, topics, options);
  
  consumer.on('message', function(message) {
    var buf = new Buffer(message.value, 'binary'); // Read string into a buffer.
    var result = "";
    for(var i = 0; i < buf.length; ++i){
        result+= (String.fromCharCode(buf[i]));
    }
    var obj= JSON.parse(result);
    lastUser=JSON.parse(obj.payload.after);
    console.log(lastUser);


    
  });
  
  consumer.on('error', function(err) {
    console.log('error', err);
  });
  
  process.on('SIGINT', function() {
    consumer.close(true, function() {
      process.exit();
    });
  });


module.exports = app;
