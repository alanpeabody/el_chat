// Socket Adapter.
// Translates WebSocket interface to Backbone.Wreqr events.
define(['el_chat'], function(ElChat) {
  return {
    initialize: function(vent, path) {
      var host   = 'ws://' + window.location.host + path,
          socket = new WebSocket(host);

      socket.onopen = function(){
        vent.trigger('socket:connected');
      };

      socket.onmessage = function(msg){
        var json = JSON.parse(msg.data);
        vent.trigger('socket:received:' + json.event, json);
      };

      socket.onclose = function(){
        vent.trigger('socket:disconnected');
      };

      vent.on('socket:send', function(data) {
        var json = JSON.stringify(data);
        socket.send(json);
      });

      return socket;
    }
  };
});
