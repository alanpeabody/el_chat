define(['marionette', 'el_chat/nav'],
  function(Marionette, Navigation) {

    var App = new Backbone.Marionette.Application();
    App.addRegions({
      navigation: '#nav',
      sidebar:    '#sidebar',
      main:       '#main',
      bottom:     '#bottom'
    });
    App.navigation.show(new Navigation);
    return App;

  }
);
