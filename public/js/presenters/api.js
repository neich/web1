var localStorage = require('../localStorage')
var EventBus = require('../eventBus')
var Router = require('./router')


var Api = {};

Api.login = function (data) {
  return $.ajax({
    url: '/api/users/login',
    dataType: 'json',
    type: 'post',
    contentType: 'application/json',
    data: JSON.stringify(data),
    processData: false,
  })
};

Api.logout = function (data) {
  return $.ajax({
    url: '/api/users/logout',
    dataType: 'json',
    type: 'post',
    contentType: 'application/json',
    processData: false,
  })
};

Api.signup = function (data) {
  return $.ajax({
    url: '/api/users',
    dataType: 'json',
    type: 'post',
    contentType: 'application/json',
    data: JSON.stringify(data),
    processData: false,
  });
};

Api.checkActiveSession = function() {
  return $.getJSON('/api/users/self')
}

Api.init = function () {

  // Login
  EventBus.on('api:login', function (username, password) {
    Api.login({username: username, password: password})
      .then(EventBus.trigger.bind(EventBus, 'api:login:successful'))
      .catch(EventBus.trigger.bind(EventBus, 'api:login:error'))
      .done()
  })
  //Login successful
  EventBus.on('api:login:successful', function (user) {
    localStorage.setItem('user', user);
    Router.router.navigate('/feed',{trigger:true})
  })
  //Login error
  EventBus.on('api:login:error', EventBus.trigger.bind(EventBus, 'ui:showError'))


  // Logout
  EventBus.on('api:logout', function () {
    Api.logout()
      .then(EventBus.trigger.bind(EventBus, 'api:logout:successful'))
      .catch(EventBus.trigger.bind(EventBus, 'api:logout:error'))
      .done()
  })
  // Logout successful
  EventBus.on('api:logout:successful', function () {
    localStorage.removeItem('user');
    Router.router.navigate('/login',{trigger:true})
  })
  // Logout error
  EventBus.on('api:logout:error', EventBus.trigger.bind(EventBus, 'ui:showError'))


  // Signup
  EventBus.on('api:signup', function (data) {
    var usr_name = data.username
    var password = data.password
    Api.signup(data)
      .then(EventBus.trigger.bind(EventBus, 'api:signup:succesful', usr_name, password))
      .catch(EventBus.trigger.bind(EventBus, 'api:signup:error'))
      .done()
  })
  // Signup successful
  EventBus.on('api:signup:succesful', function (usr_name, password) {
      Api.login({username: usr_name, password: password})
          .then(EventBus.trigger.bind(EventBus, 'api:signup:login'))
          .catch(EventBus.trigger.bind(EventBus, 'api:login:error'))
          .done()

  })

  EventBus.on('api:signup:login', function (user) {
    localStorage.setItem('user', user)
    Router.router.navigate('/profile',{trigger:true})
  })

  EventBus.on('api:signup:error', EventBus.trigger.bind(EventBus, 'ui:showError'))
}

module.exports = Api