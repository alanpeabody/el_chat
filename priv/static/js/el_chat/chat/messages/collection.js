define(['backbone'], function(BackBone) {
  var Message = Backbone.Model.extend({
    idAttribute: 'at'
  });

  return Backbone.Collection.extend({
    model: Message,
    initialize: function(models, options) {
      var self = this;
      options.vent.on('socket:received:message', function(message) {
        self.add(message);
      });
    }
  });
});
