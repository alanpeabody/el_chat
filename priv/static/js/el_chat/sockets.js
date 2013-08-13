// Socket Adapter.
// Translates WebSocket interface to Backbone.Wreqr events.
define(['el_chat'], function(ElChat) {
  return {
    initialize: function() {
      var host =  'ws://localhost:8080/chat',
      socket = new WebSocket(host);

      socket.onopen = function(){
        ElChat.vent.trigger('socket:connected');
      };

      socket.onmessage = function(msg){
        var json = JSON.parse(msg.data);
        //TODO: better event routing (needs to come via elixir).
        ElChat.vent.trigger('socket:received', json);
      };

      socket.onclose = function(){
        ElChat.vent.trigger('socket:disconnected');
      };

      ElChat.vent.on('socket:send', function(data) {
        var json = JSON.stringify(data);
        socket.send(json);
      });

      // Temp, until ui works:
      ElChat.vent.on('socket:received', function(data) {
        console.log(data);
      });

    }
  };
});
