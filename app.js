// import dependencies
// import express from 'express';
// import bodyParser from 'body-parser';
// import mongoose from 'mongoose';
// import logger from 'morgan';
// import userRoutes from './server/routes/user.js';
const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const userRoutes = require('./server/routes/user');
const http = require('http')
const cors = require('cors')
var passport = require('passport');
var server = require('http').Server(express);
var io = require('socket.io')(server);
var count = 0;
var $ipsConnected = [];
require('./server/db/db');

server.listen(3000);
// set up dependencies
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger('dev'));
app.use(cors());
app.use(passport.initialize());

// set up routes
app.use('/users/', userRoutes);


// set up port
const port = process.env.PORT || 5034;
// set up route
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to Project with Nodejs Express and MongoDB',
  });
});
app.listen(port, () => {
  console.log(`Our server is running on port ${port}`);
});

io.on('connection', function (socket) {
  var $ipAddress = socket.handshake.address;
  if (!$ipsConnected.hasOwnProperty($ipAddress)) {
    $ipsConnected[$ipAddress] = 1;
    count++;
    socket.emit('counter', { count: count });
  }
  console.log("client is connected");
  console.log(count);
  /* Disconnect socket */
  socket.on('disconnect', function () {
    if ($ipsConnected.hasOwnProperty($ipAddress)) {
      delete $ipsConnected[$ipAddress];
      count--;
      socket.emit('counter', { count: count });
    }
  });
});

module.exports.app = app;