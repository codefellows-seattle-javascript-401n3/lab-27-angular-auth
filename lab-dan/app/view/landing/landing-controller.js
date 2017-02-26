'use strict'

require('./landing.scss')

module.exports = ['$log', '$rootScope', '$location', 'signupService', LandingController]

function LandingController($log, $rootScope, $location, signupService) {
  let self = this
  self.showSignup = signupService.showSignup
  let urlChangeEvent = $rootScope.$on('$locationChangeSuccess', () => {
    self.showSignup = signupService.showSignup
  })
}
