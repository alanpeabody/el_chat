// ElChat.Chat.Messages module.
// Responsible for updating chat message window as messages arrive via socket.
define(
  ['marionette','el_chat','el_chat/sockets', './messages/collection', './messages/view'],
  function(Marionette, App, Socket, Collection, View) {
    return App.module('Chat.Messages', function(Module) {

      Module.vent = new Backbone.Wreqr.EventAggregator();

      Module.addInitializer(function() {
        Module.socket = Socket.initialize(Module.vent, '/chat');
        App.currentUser.on('login', function() {
          Module.vent.trigger('socket:send', {event: 'join', name: App.currentUser.get('name')});
        });
      });

      var messages = new Collection([], {vent: Module.vent});
      var messagesView = new View({collection: messages});

      Module.display = function() {
        App.main.show(messagesView);
      };
    });
  }
);
