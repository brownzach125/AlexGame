Chat = function(){
  
};

Chat.sendMessage = function(msg){
  Communicator.send('user message' , msg);
};

Chat.recieveMessage = function(from, msg) {
    $('#lines').append($('<p>').append($('<b>').text(from), msg));
};

$(function () {
    function clear () {
        $('#message').val('').focus();
    };
    $('#send-message').submit(function () {
      Chat.recieveMessage('me', $('#message').val());
      Chat.sendMessage($('#message').val());
      clear();
      $('#lines').get(0).scrollTop = 10000000;
      return false;
    });
  
});

