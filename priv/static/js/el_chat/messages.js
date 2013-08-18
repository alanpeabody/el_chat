// ElChat.Chat.Messages module.
// Responsible for updating chat message window as messages arrive via socket.
define(['backbone','marionette','el_chat','el_chat/sockets'], function(BackBone, Marionette, App, Socket) {
  return App.module('Chat.Messages', function(Module) {
    Module.vent = new Backbone.Wreqr.EventAggregator();

    Module.addInitializer(function() {
      Messages.socket = Socket.initialize(Module.vent, '/chat');
      console.log('App.Chat.Messages module started');
    });

    // TODO: Move to own files.
    var Message = Backbone.Model.extend({
      idAttribute: 'at'
    });
    var Messages = Backbone.Collection.extend({
      model: Message,
      initialize: function() {
        var self = this;
        Module.vent.on('socket:received:message', function(message) {
          self.add(message);
        });
      }
    });
    var MessageView = Marionette.ItemView.extend({
      template: '#message-template',
      className: 'message row',
      serializeData: function() {
        return {model: this.model};
      }
    });
    var MessagesView = Marionette.CompositeView.extend({
      itemView: MessageView,
      itemViewContainer: '#messages',
      template: '#messages-template',
      className: 'messages panel'
    });

    var messages = new Messages();
    var messagesView = new MessagesView({collection: messages});

    Module.display = function() {
      App.main.show(messagesView);
    };
  });
});
