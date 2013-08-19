define(['backbone', 'el_chat', 'el_chat/login', './view'],
  function(Backbone, App, Screen, View) {

    var view = new View({model: App.currentUser});

    return Backbone.Router.extend({
      routes: {
        ''       : 'loginOrRedirect',
        'logout' : 'logout'
      },

      loginOrRedirect: function() {
        if (App.currentUser.isLoggedIn()) {
          this.navigate('chat', {trigger: true});
        } else {
          App.main.show(view);
        }
      },

      logout: function() {
        App.currentUser.logout();
        this.navigate('', {trigger: true});
      }
    });

  }
);
