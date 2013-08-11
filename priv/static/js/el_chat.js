define(['marionette'], function(Marionette) {

  var App = new Backbone.Marionette.Application();

  App.addRegions({
    usersRegion: '#users',
    chatRegion: '#chat'
  });

  App.on('initialize:after', function() {
    console.log('initialized!');
  });
  return App;
});
