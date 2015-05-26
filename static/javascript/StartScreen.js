function check(set){
  if (!set) {
    return true;
  }
  $('#nickname-err').css('visibility', 'visible');
};
$(function () {    
    $('#game-select').submit(function (event) {
       Communicator.join_game($('#nick-input').val(), $('#game-input').val() , check);
       return false;
    });
});