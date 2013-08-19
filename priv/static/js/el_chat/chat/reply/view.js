define(['marionette', 'el_chat/chat'],
  function(Marionette, Screen) {

    return Marionette.ItemView.extend({
      template: '#reply-template',
      className: 'panel panel-info',

      serializeData: function() {
        return {model: this.model};
      },

      events: {
        'click button': 'postMessage',
        'keyup .body': 'postOnEnter'
      },

      postMessage: function() {
        var body = this.$('.body').val();
        Screen.vent.trigger('socket:send', {event: 'message', body: body});
        this.$('.body').val('').focus();
      },

      postOnEnter: function(e) {
        if (e.keyCode == 13) {
          this.postMessage();
        }
      }
    });
  }
);
