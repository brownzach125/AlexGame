from socketio.namespace import BaseNamespace
from socketio.mixins import RoomsMixin, BroadcastMixin
from Mixins.GamesMixin import GamesMixin

class GameNamespace(BaseNamespace , GamesMixin):
    games = {}
    #An example method for sending message to all the peeps
    @classmethod
    def justWork(cls):
        for space in cls.spaces:
            space.emit("msg_to_room" , 'The server' , "fuckall")
               
    def on_join_game(self, nickname , game):
        if game in GameNamespace.games:
            GameNamespace.games[game].append(self)
        else:
            GameNamespace.games[game] = [ self ]
        
        if game in self.request:
            self.request[game]['nicknames'].append(nickname)
        else:
            self.request[game] = { 'nicknames' : [ nickname ] }
        
        self.socket.session['game'] =  game
        self.join(game)
        self.socket.session['nickname'] = nickname
        
        self.emit_to_playmates('announcement', '%s has connected' % nickname)
        self.emit_to_game('nicknames', self.request[game]['nicknames'] )
        self.emit('entergame')
        
    
    def recv_connect(self):
        #print("new connection")
        v = 2
        
    def recv_disconnect(self):
        # Remove nickname from the list.
        try:
            nickname = self.socket.session['nickname']
            game     = self.socket.session['game']
        
            self.emit_to_game('announcement', '%s has disconnected' % nickname)
            self.emit_to_game('nicknames', self.request[game]['nicknames'] )
            self.disconnect(silent=True)
        except:
            #Eating an exception here nom
            v = 2
    def on_user_message(self, msg):
        print(msg)
        self.emit_to_playmates('msg_to_room',
            self.socket.session['nickname'], msg)

    def recv_message(self, message):
        print "PING!!!", message
