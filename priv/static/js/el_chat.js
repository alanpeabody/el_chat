define(['marionette'], function(Marionette) {

  var App = new Backbone.Marionette.Application();

  App.addRegions({
    usersRegion: '#users',
    chatRegion: '#chat'
  });


  return App;
});
