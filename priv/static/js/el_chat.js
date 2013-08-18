define(['marionette'], function(Marionette) {
  var App = new Backbone.Marionette.Application();

  App.addRegions({
    sidebar: '#sidebar',
    main: '#main'
  });

  return App;
});
