define(['marionette'], function(Marionette) {
  return Marionette.ItemView.extend({
    template: '#login-template',
    className: 'panel panel-info',

    serializeData: function() {
      return {model: this.model};
    },

    events: {
      'click button': 'setName'
    },

    setName: function(e) {
      this.model.loginAs(this.$('.name').val());
    }
  });
});
