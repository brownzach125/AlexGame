WEB_SOCKET_SWF_LOCATION = "/static/WebSocketMain.swf";
WEB_SOCKET_DEBUG = true;
// socket.io specific code
var socket = io.connect("/game");

$(window).bind("beforeunload", function() {
    socket.disconnect();
});
socket.on('connect', function () {
    $('#chat').addClass('connected');
});
socket.on('announcement', function (msg) {
    $('#lines').append($('<p>').append($('<em>').text(msg)));
});

//Set all the names of all the people who are in the chat room.
socket.on('nicknames', function (nicknames) {
    $('#nicknames').empty().append($('<span>Online: </span>'));
    for (var i in nicknames) {
	  $('#nicknames').append($('<b>').text(nicknames[i]));
    }
});

socket.on('msg_to_room', message);
function message (from, msg) {
    $('#lines').append($('<p>').append($('<b>').text(from), msg));
}
socket.on('reconnect', function () {
    $('#lines').remove();
    message('System', 'Reconnected to the server');
});
socket.on('reconnecting', function () {
    message('System', 'Attempting to re-connect to the server');
});
socket.on('error', function (e) {
    message('System', e ? e : 'A unknown error occurred');
});
