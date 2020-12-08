const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const userRoutes = require('./server/routes/user');
const cors = require('cors')
const passport = require('passport');
require('./server/db/db');

// set up dependencies
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger('dev'));
app.use(cors({ credentials: true, origin: 'http://172.22.176.1:5500' })); app.use(passport.initialize());

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

const http = require('http').Server(app);
const io = require('socket.io')(http);
var count = 0;
var $ipsConnected = [];

http.listen(port, () => {
  console.log(`Our server is running on port ${port}`);
});


io.on('connection', function (socket) {
  console.log(socket);
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