// ElChat.Chat.Reply module.
// Responsible for accepting user input and triggering proper events.
define(['marionette','el_chat','el_chat/chat', './reply/view'],
  function(Marionette, App, Screen, View) {

    return App.module('Chat.Reply', function(Module) {

      var view = new View();

      Module.display = function() {
        App.bottom.show(view);
      };
    });

  }
);

