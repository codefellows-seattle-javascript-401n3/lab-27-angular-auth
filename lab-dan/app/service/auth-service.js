'use strict'

module.exports = ['$q', '$log', '$http', '$window', authService]

function authService ($q, $log, $http, $window) {
  $log.debug('authService')

  let service = {}
  let token = null

  function setToken (_token) {}

  service.getToken = function () {}

  service.logout = function () {}

  service.signup = function (user) {}

  service.login = function (user) {}

  return service
}
