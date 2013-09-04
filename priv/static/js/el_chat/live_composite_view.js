// LiveCompositeView - a composite view appropriate for collections updating
// in the background.
// By default the composite view renders on add, remove, or reset of collection.
// We don't want this behavior when updating our collection in the background.
// Instead we want to listen to this behavior only once rendered.
define(['marionette'], function(Marionette) {

  return Marionette.CompositeView.extend({
    _initialEvents: function () {},
    onRender: function() {
      this.listenTo(this.collection, "add", this.addChildView, this);
      this.listenTo(this.collection, "remove", this.removeItemView, this);
      this.listenTo(this.collection, "reset", this._renderChildren, this);
    }
  });

});
