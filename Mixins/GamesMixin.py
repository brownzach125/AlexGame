class GamesMixin(object):
    
    def join(self, game):
        #TODO if already in a game this should throw an error
        self.session[game] = game

    def leave(self, room):
        self.session[game] = None

    def emit_to_game(self, event, *args):
        pkt = dict(type="event",
                   name=event,
                   args=args,
                   endpoint=self.ns_name)
        for sessid, socket in self.socket.server.sockets.iteritems():
            if 'game' not in socket.session:
                continue
            if self.socket.session['game'] == socket.session['game']:
                socket.send_packet(pkt)
    def emit_to_playmates(self, event, *args):
        pkt = dict(type="event",
                   name=event,
                   args=args,
                   endpoint=self.ns_name)
        for sessid, socket in self.socket.server.sockets.iteritems():
            if 'game' not in socket.session:
                continue
            if self.socket.session['game'] == socket.session['game'] and self.socket != socket:
                socket.send_packet(pkt)