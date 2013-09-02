define(['backbone'], function(BackBone) {
  var User = Backbone.Model.extend({
    idAttribute: 'pid'
  });

  return Backbone.Collection.extend({
    model: User,
    initialize: function(models, options) {
      var self = this;
      options.vent.on('socket:received:joined', function(user) {
        self.add(user);
      });

      options.vent.on('socket:received:nick_updated', function(json) {
        self.get(json['pid']).set('nick', json['nick']);
      });

      options.vent.on('socket:received:left', function(json) {
        self.remove(self.get(json['pid']));
      });

      options.vent.on('socket:received:users', function(json) {
        self.reset(json['users']);
      });

      options.vent.on('socket:connected', function() {
        options.vent.trigger('socket:send', {event: 'users'});
      });
    }
  });
});
