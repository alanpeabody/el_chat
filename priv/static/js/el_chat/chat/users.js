// ElChat.Chat.User module.
// Responsible for displaying list of currently connected users.
define(['marionette','el_chat','el_chat/chat','./users/collection', './users/view'],
  function(Marionette, App, Screen, Collection, View) {

    return App.module('Chat.Users', function(Module) {

      var collection = new Collection([], {vent: Screen.vent}),
          view       = new View({collection: collection});

      Module.display = function() {
        App.sidebar.show(view);
      };
    });

  }
);

