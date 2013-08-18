// ElChat.Chat Module
// Wraps submodules for Users, Messages, and Reply.
// Handles Routing
define(['marionette','el_chat','./chat/messages'], function(Marionette, App, Messages) {
  return App.module('Chat', function(Module) {

    var Router = Backbone.Router.extend({
      routes: { 'chat': 'display' },
      display: function() { Module.display(); }
    });

    Module.addInitializer(function() { new Router(); });

    Module.display = function() {
      App.Chat.Messages.display();
    };
  });
});
