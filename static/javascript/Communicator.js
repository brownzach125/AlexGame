WEB_SOCKET_SWF_LOCATION = "/static/WebSocketMain.swf";
WEB_SOCKET_DEBUG = true;
// socket.io specific code

Communicator = function(){

};

Communicator.setListeners = function(){
  Communicator.socket.on('connect', function () {
    $('#chat').addClass('connected');
  });
  
  Communicator.socket.on('announcement', function (msg) {
    $('#lines').append($('<p>').append($('<em>').text(msg)));
  });

  //Set all the names of all the people who are in the chat room.
  Communicator.socket.on('nicknames', function (nicknames) {
    $('#nicknames').empty().append($('<span>Online: </span>'));
    for (var i in nicknames) {
    $('#nicknames').append($('<b>').text(nicknames[i]));
    }
  });

  Communicator.socket.on('msg_to_room', Chat.recieveMessage);
   
  Communicator.socket.on('reconnect', function () {
    $('#lines').remove();
    Communicator.message('System', 'Reconnected to the server');
  });
  
  Communicator.socket.on('reconnecting', function () {
    Communicator.message('System', 'Attempting to re-connect to the server');
  });
  
  Communicator.socket.on('error', function (e) {
    Communicator.message('System', e ? e : 'A unknown error occurred');
  });
  
  Communicator.socket.on('entergame', function(msg){
    Game.start();//HMMM
  });

};

Communicator.join_game = function( nickname , gamename , callback){
  Communicator.socket.emit('join game' , nickname , gamename , callback);
};


Communicator.send = function(type , msg){
  Communicator.socket.emit(type, msg);  
};

Communicator.message = function(from, msg) {
    $('#lines').append($('<p>').append($('<b>').text(from), msg));
};

$(window).bind("beforeunload", function() {
    Communicator.socket.disconnect();
});

$( document).ready( function() {
  Communicator.socket = io.connect('/game');
  Communicator.setListeners();
});