define(['marionette', 'backbone'],
  function(Marionette, Backbone) {

    var NavItem = Backbone.Model.extend({
      initialize: function() {
        var pathRegEx = new RegExp('#'+this.get('path'));
        this.set('active', pathRegEx.test(window.location.hash));
      },
      navigate: function() {
        Backbone.history.navigate(
          this.get('path'),
          {trigger: !this.get('active')}
        );
        this.collection.invoke('set', 'active', false);
        this.set('active', true);
      }
    });

    var NavItems = Backbone.Collection.extend({model: NavItem});
    var navItems = new NavItems([
      {name: 'Chat',      path: 'chat',      active: false},
      {name: 'Processes', path: 'processes', active: false}
    ]);

    var NavItemView = Marionette.ItemView.extend({
      template: '#nav-item-template',
      tagName: 'li',
      onBeforeRender: function(){
        this.$el.toggleClass('active', this.model.get('active'));
      },
      modelEvents: { 'change': 'render' },
      serializeData: function() {
        return {model: this.model};
      },
      events: { 'click a': 'navigate' },
      navigate: function(e) {
        e.preventDefault();
        this.model.navigate();
      }
    });

    return Marionette.CompositeView.extend({
      initialize: function() {
        this.collection = navItems;
      },
      template: '#nav-template',
      itemViewContainer: '#nav-items',
      itemView: NavItemView
    });

  }
);
