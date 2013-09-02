define(['marionette'], function(Marionette) {
  var UserView = Marionette.ItemView.extend({
    tagName: 'li',
    template: '#user-template',
    className: 'user list-group-item',
    serializeData: function() { return {model: this.model}; },
    modelEvents: { 'change': 'render' }
  });

  return Marionette.CompositeView.extend({
    itemView: UserView,
    itemViewContainer: '#users',
    template: '#users-template',
    className: 'users panel panel-default'
  });
});
