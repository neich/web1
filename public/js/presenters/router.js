var EventBus = require('../eventBus')
var localStorage = require('../localStorage')

var Router = {}

Router.init = function () {
  var AppRouter = Backbone.Router.extend({
    routes: {
      // Define some URL routes
      '': 'home',
      'signup': 'signup',
      'login': 'showLogin',
      'orders': 'showOrders',
      'profile': 'showProfile',
      'feed': 'showFeed',

      // Default
      '*actions': 'defaultAction'
    },

    home: function () {
      EventBus.trigger('ui:showHome')
    },

    signup: function () {
      EventBus.trigger('ui:switch:signup')
    },

    showOrders: function () {
      EventBus.trigger('ui:switch:orders')
    },

    showFeed: function () {
        EventBus.trigger('ui:showFeed')
    },

    showProfile: function () {
        EventBus.trigger('ui:showProfile')
    },

    showLogin: function () {
        EventBus.trigger('ui:showLogin')
    }
  })

  Router.router = new AppRouter()

  Backbone.history.start()
}

module.exports = Router