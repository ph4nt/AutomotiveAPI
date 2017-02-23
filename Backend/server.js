var app = require('express')();
var bodyParser = require('body-parser');
var server = require('http').Server(app);
var io = require('socket.io')(server);
var redis = require('redis');
var redisClient = redis.createClient();
var port = 8080;
var socket_events = {
  'GET_VEHICLE': 'GET_VEHICLE'
}

redisClient.on('connect', function () {
  console.log('connected to redis... ready to send data to backend');
});

server.listen(port, function () {
  console.log('listening to connections on port ' + port);
});

io.on('connection', function (socket) {
  console.log('client connected to server');

  socket.on('disconnect', function () {
    console.log('client disconnected');
  });
});

app.use(bodyParser.json());

app.post("/", function (req, res) {
  if (!req.body || !req.body.vehicle) return;
  var vehicle = req.body.vehicle;
  redisClient.set('vehicle-' + vehicle.id + '-' + vehicle.time, JSON.stringify(vehicle), function (err, reply) {
    if (!err) {
      io.sockets.emit(socket_events.GET_VEHICLE, JSON.stringify(vehicle));
    }
  });
  res.send();
});