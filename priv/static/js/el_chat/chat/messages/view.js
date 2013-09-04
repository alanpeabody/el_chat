define(['marionette', 'el_chat/live_composite_view'],
  function(Marionette, LiveCompositeView) {

    var MessageView = Marionette.ItemView.extend({
      template: '#message-template',
      className: 'message row',
      serializeData: function() {
        return {model: this.model};
      }
    });

    return LiveCompositeView.extend({
      itemView: MessageView,
      itemViewContainer: '#messages',
      template: '#messages-template',
      className: 'messages panel panel-default'
    });

  }
);
