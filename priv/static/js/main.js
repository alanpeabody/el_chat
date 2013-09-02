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

// Load up all routers
define(['el_chat', 'el_chat/chat/router'],
  function(App, ChatRouter) {
    App.start();
    new ChatRouter();
    Backbone.history.start();

    //For debugging/playing/triggering events in the console.
    window.App = App;
  }
);
