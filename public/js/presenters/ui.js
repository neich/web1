var EventBus = require('../eventBus')
var localStorage = require('../localStorage')
var CollectionOrder = require("../collections/c_orders")
var ModelUser = require("../models/m_user")
var MainPostFeedCollection = require("../collections/c_post_feed")
var UserLogin = require("../views/user/v_login")
var UserSignup = require("../views/user/v_signup")
var UserProfile = require("../views/user/v_profile")
var HeaderView = require("../views/header")
var OrdersView = require("../views/order/vl_orders")
var MainPostFeedCollectionView = require("../views/post/vl_post_feed")
var Router = require('./router')

var Ui = {}

var orderList = new CollectionOrder({eventBus: EventBus})

var $content = $('#content')

var lastHeader = null
var lastContent = null

Ui.switchContent = function (widget) {
  if (lastContent) lastContent.undelegateEvents()
  var args = Array.prototype.slice.call(arguments)
  args.shift()
  switch (widget) {
    case 'login': {
      Router.router.navigate('/login')
      lastContent = new UserLogin({el: $content, eventBus: EventBus}).render()
      $('.navbar').addClass('hidden')
      break
    }
    case 'signup': {
      lastContent = new UserSignup({el: $content, eventBus: EventBus}).render()
      $('.navbar').addClass('hidden')
      break
    }
    case 'feed': {
      if (localStorage.hasItem('user')) {
        $('.navbar').removeClass('hidden')
        if (lastHeader) lastHeader.undelegateEvents()
        var user = localStorage.getItem('user')
        var mainFeedCollection = new MainPostFeedCollection()
        lastHeader = new HeaderView({el: '#header', eventBus: EventBus, user: user}).render()
        mainFeedCollection.fetch({
          // data: {user_id: user.id},
          success: function () {
            lastContent = new MainPostFeedCollectionView({el: $content, eventBus: EventBus, collection: mainFeedCollection}).render()
          },
          error: Ui.error
        })
      }
      else
        Ui.switchContent('login')
      break
    }
    case 'profile':{
        if (localStorage.hasItem('user')) {
            $('.navbar').removeClass('hidden')
            var user = localStorage.getItem('user')
            var usrModel = new ModelUser({id: user.id})
            usrModel.fetch({
                success: function () {
                    lastContent = new UserProfile({el: $content, eventBus: EventBus, model: usrModel}).render()
                    if (lastHeader) lastHeader.undelegateEvents()
                    lastHeader = new HeaderView({el: '#header', eventBus: EventBus, user: user}).render()
                },
                error: Ui.error
            });
        }
        else
            Ui.switchContent('login')
        break
    }
  }
}

Ui.init = function () {
}

Ui.showHome = function () {
  if (localStorage.hasItem('user')) {
    Router.router.navigate('/feed',{trigger:true})
  } else {
    Router.router.navigate('/login',{trigger:true})
  }
}

Ui.showSignup = function () {
  Ui.switchContent('signup')
}

// This always receive a JSON object with a standard API error
Ui.error = function (err) {
  if (err.message)
    alert("Error: " + err.message)
  else if (err.responseJSON) {
    if (err.responseJSON.message)
      alert("Error: " + err.responseJSON.message)
    else if (err.responseJSON.error)
      alert("Error: " + err.responseJSON.error.message)
  }
}

EventBus.on('ui:showHome', Ui.showHome)
EventBus.on('ui:showError', Ui.error)
EventBus.on('ui:switch:signup', Ui.showSignup)
// EventBus.on('ui:switch:orders', Ui.switchContent.bind(null, 'orders'))
EventBus.on('ui:showProfile',Ui.switchContent.bind(null, 'profile'))
EventBus.on('ui:showLogin',Ui.switchContent.bind(null, 'login'))
EventBus.on('ui:showFeed',Ui.switchContent.bind(null, 'feed'))


module.exports = Ui

