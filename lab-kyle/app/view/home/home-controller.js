'use strict'

require('./_home.scss')

module.exports = ['$log', 'authService', HomeController]

function HomeController($log, authService) {
  $log.debug('HomeController')

  this.logout = function() {
    $log.debug('HomeController.logout()')
    authService.logout()
  }
}
