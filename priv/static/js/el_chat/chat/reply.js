// ElChat.Chat.Reply module.
// Responsible for accepting user input and triggering proper events.
define(['marionette','el_chat','el_chat/chat'],
  function(Marionette, App, Screen) {

    return App.module('Chat.Reply', function(Module) {

      Module.display = function() {
        //App.bottom.show(view);
      };
    });

  }
);

