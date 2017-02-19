'use strict'

require('./landing.scss')

module.exports = ['$log', '$location', LandingController]

function LandingController($log, $location) {
  let self = this
  $log.debug('In the landing controller')
  let url = $location.url()
  self.showSignup = url === './join#signup' || url === '/join'
}
