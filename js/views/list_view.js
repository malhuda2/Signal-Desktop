(function() {
  'use strict';
  window.Whisper = window.Whisper || {};

  /*
    * Generic list view that watches a given collection, wraps its members in
    * a given child view and adds the child view elements to its own element.
    */
  Whisper.ListView = Backbone.View.extend({
    tagName: 'ul',
    itemView: Backbone.View,
    initialize: function(options) {
      this.options = options || {};
      this.listenTo(this.collection, 'add', this.addOne);
      this.listenTo(this.collection, 'reset', this.addAll);
    },

    addOne: function(model) {
      if (this.itemView) {
        var options = _.extend({}, this.options.toInclude, { model: model });
        var view = new this.itemView(options);
        this.$el.append(view.render().el);
        this.$el.trigger('add');
      }
    },

    addAll: function() {
      this.$el.html('');
      this.collection.each(this.addOne, this);
    },

    render: function() {
      this.addAll();
      return this;
    },
  });
})();
