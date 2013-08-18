require.config({
  paths: {
    jquery: '/static/vendor/js/jquery/jquery',
    underscore: '/static/vendor/js/underscore-amd/underscore',
    backbone: '/static/vendor/js/backbone-amd/backbone',
    marionette: '/static/vendor/js/marionette/lib/backbone.marionette'
  },
  shim: {
    jquery: {
      exports: 'jQuery'
    },
    underscore: {
      exports: '_'
    },
    backbone: {
      deps: ['jquery', 'underscore'],
      exports: 'Backbone'
    },
    marionette: {
      deps: ['jquery', 'underscore', 'backbone'],
      exports: 'Marionette'
    }
  }
});

define(['el_chat', 'el_chat/chat', 'el_chat/login'], function(App, Chat) {
  App.start();
  Backbone.history.start();
  window.App = App; //For debugging/playing/triggering events in the console.
});
