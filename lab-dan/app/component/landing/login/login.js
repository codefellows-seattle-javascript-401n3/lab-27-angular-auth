'use strict'

require('./login.scss')

module.exports = {
  template: require('./login.html'),
  controller: ['$log', '$location', 'authService', LoginController],
  controllerAs: 'loginCtrl'
}

function LoginController($log, $location, authService) {
  let self = this
  $log.debug('LoginController')

  authService.getToken()
  .then(() => {
    $location.url('/home')
  })

  self.login = function () {
    $log.debug('loginCtrl.login()')

    authService
      .login(self.user)
      .then(() => {
        $location.url('/home')
      })
  }
}
