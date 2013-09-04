define(['backbone', 'el_chat', './messages', './reply', './users'],
  function(Backbone, App, Messages, Reply, Users) {

    return Backbone.Router.extend({
      routes: {
        ''    : 'redirect',
        'chat': 'display'
      },
      redirect: function() {
        Backbone.history.navigate('chat', { trigger: true });
      },
      display: function() {
        Messages.display();
        Reply.display();
        Users.display();
      }
    });

  }
);
