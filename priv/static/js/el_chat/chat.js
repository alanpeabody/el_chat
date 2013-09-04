// ElChat.Chat Screen
// Mediates communication for Users, Messages, and Reply modules, as well as
// the chat socket.
define(['marionette', 'el_chat', 'el_chat/sockets'],
  function(Marionette, App, Socket) {

    return App.module('Chat', function(Screen) {
      Screen.vent = new Backbone.Wreqr.EventAggregator();
      Screen.socket = Socket.initialize(Screen.vent, '/chat');
    });

  }
);
