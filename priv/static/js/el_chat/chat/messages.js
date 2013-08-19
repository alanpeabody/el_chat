// ElChat.Chat.Messages module.
// Responsible for updating chat message window when events are triggered.
define(['el_chat', 'el_chat/chat', './messages/collection', './messages/view'],
  function(App, Screen, Collection, View) {

    return App.module('Chat.Messages', function(Module) {
      var messages     = new Collection([], {vent: Screen.vent}),
          messagesView = new View({collection: messages});

      Module.display = function() {
        App.main.show(messagesView);
      };
    });

  }
);
