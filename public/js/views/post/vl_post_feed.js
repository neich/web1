var tl_post_feed = require("raw-loader!../../../templates/post/tl_post_feed.html")
var MainPostFeedView = require('./v_post_feed')

var MainPostFeedCollectionView = Backbone.View.extend({

  initialize: function(params) {
    this.eventBus = params.eventBus
    this.template = _.template(tl_post_feed)
  },

  className: 'container',

  render: function () {
    this.$el.html(this.template({posts: this.collection}))
    var $feedContainer = this.$el.find('.list-group')
    this.collection.each(function(post) {
      $feedContainer.append(new MainPostFeedView({model: post}).render().el)
    })

    return this
  }

});

module.exports = MainPostFeedCollectionView
