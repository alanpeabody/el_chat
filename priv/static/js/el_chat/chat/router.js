define(['backbone', 'el_chat', './messages', './reply'],
  function(Backbone, App, Messages, Reply) {

    return Backbone.Router.extend({
      routes: { 'chat': 'display' },
      display: function() {
        Messages.display();
        Reply.display();
      }
    });

  }
);
