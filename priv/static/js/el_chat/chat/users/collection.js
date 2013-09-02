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
    }
  });
});
