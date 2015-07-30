const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const path = require('path');

app.use(express.static('public'));

app.get('/', function (req, res){
  res.sendFile(path.join(__dirname, '/public/index.html'));
});

io.on('connection', function(socket){
  console.log('A client has connected');

  // var interval = setInterval(function(){
  //   socket.emit('message', { user: 'turingbot', text: 'A new message' });
  // }, 1000);

  socket.on('disconnect', function(){
    // clearInterval(interval);
  });

  socket.on('message', function(channel, message){
    io.sockets.emit('message', message);
  });

});

http.listen(process.env.PORT || 3000, function(){
  console.log('Your server is up and running on Port 3000. Good job!');
});
