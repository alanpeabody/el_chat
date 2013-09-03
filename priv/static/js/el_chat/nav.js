define(['marionette', 'backbone'],
  function(Marionette, Backbone) {

    var NavItem = Backbone.Model.extend({
      navigate: function() {
        this.collection.invoke('set', 'active', false);
        Backbone.history.navigate(
          this.get('path'),
          {activate: !this.get('active')}
        );
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
