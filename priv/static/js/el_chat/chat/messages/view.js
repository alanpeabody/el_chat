define(['marionette'], function(Marionette) {
  var MessageView = Marionette.ItemView.extend({
    template: '#message-template',
    className: 'message row',
    serializeData: function() {
      return {model: this.model};
    }
  });

  return Marionette.CompositeView.extend({
    itemView: MessageView,
    itemViewContainer: '#messages',
    template: '#messages-template',
    className: 'messages panel'
  });
});
