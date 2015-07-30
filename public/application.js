var $newMessageUser = $('#message-user');
var $newMessageText = $('#message-text');
var $submitMessage = $('#submit-message');


var socket = io();

socket.on('connect', function(){
  console.log('We have connected to the server.')
  socket.send('message', 'I AM CONNECTED TO YOU')
});

socket.on('message', function(message){
  console.log(message)
  addElement(message['text'])
});

function addElement(message){
  $(".lyrics").append("<p>"+message+"</p>")
};

$submitMessage.on('click', function(){
  var message = {
    user: $newMessageUser.val(),
    text: $newMessageText.val()
  }
  console.log(message)
  socket.send('message', message);

  $newMessageUser.val('')
  $newMessageText.val('')
});