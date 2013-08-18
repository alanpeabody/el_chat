// ElChat.Chat Module
// Wraps submodules for Users, Messages, and Reply.
// Handles Routing
define(['marionette','el_chat','el_chat/messages'], function(Marionette, App, Messages) {
  return App.module('Chat', function(Chat) {
    Chat.addInitializer(function() {
      console.log('App.Chat module started');
    });

    Chat.display = function() {
      App.Chat.Messages.display();
    };
  });
});
