var t_post_feed = require("raw-loader!../../../templates/post/t_post_feed.html")

//Poso aquest com a Main, perque tinc pensat que el perfil d'usuari també seria un altre "feed" pero nomes amb els Items de l'usuari
var MainPostFeedView = Backbone.View.extend({

  initialize: function(params) {
    this.eventBus = params.eventBus;
    this.template = _.template(t_post_feed);
  },

  className: 'container',

  render: function () {
    this.$el.html(this.template({post: this.model}))
    return this
  }
})

module.exports = MainPostFeedView