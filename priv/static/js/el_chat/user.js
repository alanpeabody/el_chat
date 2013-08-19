define(['backbone'],
  function(BackBone) {

    return Backbone.Model.extend({
      idAttribute: 'name',

      isLoggedIn: function() {
        return this.get('name')
      },

      isValidName: function(name) {
        return name !== null && name !== '';
      },

      loginAs: function(name) {
        if (this.isValidName(name)) {
          this.set('name', name)
          localStorage.setItem('name', this.get('name'));
          this.trigger('login');
        }
      },

      loginFromStorage: function(name) {
        this.loginAs(localStorage.getItem('name'));
      },

      logout: function() {
        this.set('name', null);
        localStorage.removeItem('name');
      }
    });

  }
);
