define(['marionette', 'el_chat/live_composite_view'],
  function(Marionette, LiveCompositeView) {

    var UserView = Marionette.ItemView.extend({
      tagName: 'li',
      template: '#user-template',
      className: 'user list-group-item',
      serializeData: function() { return {model: this.model}; },
      modelEvents: { 'change': 'render' }
    });

    return LiveCompositeView.extend({
      itemView: UserView,
      itemViewContainer: '#users',
      template: '#users-template',
      className: 'users panel panel-default'
    });
  }
);
