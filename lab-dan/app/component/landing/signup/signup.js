'use strict'

require('./signup.scss')

module.exports = {
  template: require('./signup.html'),
  controller: ['$log', '$location', 'authService', SignupController],
  controllerAs: 'signupCtrl'
}

function SignupController($log, $location, authService) {
  // signup
  let self = this
  
  authService
    .getToken()
    .then(() => {
      $location.url('/home')
    })

  this.signup = function() {
    authService
      .signup(self.user)
      .then(() => {
        $location.url('/home')
      })
  }
}
