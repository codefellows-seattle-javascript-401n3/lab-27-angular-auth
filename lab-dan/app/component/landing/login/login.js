'use strict'

require('./login.scss')

module.exports = {
  template: require('./login.html'),
  controller: ['$log', '$location', 'authService', 'signupService', LoginController],
  controllerAs: 'loginCtrl'
}

function LoginController($log, $location, authService, signupService) {
  let self = this
  self.user = null

  authService.getToken()
  .then(() => {
    $location.url('/home')
  })

  self.login = function (user) {
    authService
      .login(user)
      .then(() => {
        $location.url('/home')
      })
  }

  this.goToSignup = function () {
    $log.debug('going to signup')
    signupService.changeStatus()
  }
}
