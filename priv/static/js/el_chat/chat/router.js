define(['backbone', 'el_chat', './messages', './reply', './users'],
  function(Backbone, App, Messages, Reply, Users) {

    return Backbone.Router.extend({
      routes: { 'chat': 'display' },
      display: function() {
        Messages.display();
        Reply.display();
        Users.display();
      }
    });

  }
);
