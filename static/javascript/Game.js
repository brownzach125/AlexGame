Game = function(){
  
};

 var pos = 0;
 var lastTime = 0;
 var height = 0;
 var width  = 0;
 var speed  = 3;
Game.tick = function() {
        requestAnimFrame(Game.tick);
        Game.drawScene();
        Game.animate();
};

Game.drawScene = function(){
  
   Game.ctx.clearRect(0, 0, width, height);
   Game.ctx.fillStyle = "#FF0000";
   Game.ctx.fillRect(pos , 100 , 50 , 50);
    
};

Game.start = function(){
  $("#start_screen").css('display', 'none');
  $("#game_view").css('display', 'block');
  $("#chat_view").css('display', 'block');
  var c = document.getElementById("gameCanvas");
  height = c.height;
  width  = c.width;
  Game.ctx = c.getContext("2d");
  Game.tick();
};

Game.animate = function(){
        var timeNow = new Date().getTime();
        if (lastTime != 0) {
            var elapsed = timeNow - lastTime;
            //Do something with the time passed
            
            pos += speed;
            if(pos <= 0 || pos >= width-50){
              speed = -speed;
    }

            
        }
        lastTime = timeNow;
};

