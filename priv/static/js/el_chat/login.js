// ElChat.Login Module
// Handles acquiring the user's name.
// Handles Routing for Chat module.
define(['marionette','el_chat','./login/view'], function(Marionette, App, View) {
  return App.module('Login', function(Module) {

    var view = new View({model: App.currentUser});

    var Router = Backbone.Router.extend({
      routes: {
        ''       : 'loginOrRedirect',
        'logout' : 'logout'
      },

      loginOrRedirect: function() {
        if (App.currentUser.isLoggedIn()) {
          this.navigate('chat', {trigger: true});
        } else {
          Module.display();
        }
      },

      logout: function() {
        App.currentUser.logout();
        this.navigate('', {trigger: true});
      }
    });

    Module.addInitializer(function() {
      var router = new Router();
      App.currentUser.on('login', function() {
        router.navigate('chat', {trigger: true})
      });
      App.currentUser.loginFromStorage();
    });

    Module.display = function() {
      App.main.show(view);
    };
  });
});
