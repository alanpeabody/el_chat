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

define(['el_chat', 'el_chat/sockets'], function(ElChat, Socket) {
  ElChat.addInitializer(Socket.initialize);
  ElChat.on('initialize:after', function() {
    console.log('initialized!');
  });
  window.ElChat = ElChat;
  ElChat.start();
});
