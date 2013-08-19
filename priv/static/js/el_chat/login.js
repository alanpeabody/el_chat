// ElChat.Login Module
// Handles acquiring the user's name.
// Handles Routing for Chat module.
define(['marionette','el_chat'],
  function(Marionette, App) {

    return App.module('Login', function(Module) {
      Module.addInitializer(function() {
        App.currentUser.on('login', function() {
          Backbone.history.navigate('chat', {trigger: true})
        });
      });
    });

  }
);
