define(['marionette', 'el_chat/user'],
  function(Marionette, User) {

    var App = new Backbone.Marionette.Application();
    App.currentUser = new User();
    App.addRegions({
      sidebar: '#sidebar',
      main:    '#main',
      bottom:  '#bottom'
    });
    return App;

  }
);
