'use strict'

require('./login.scss')

module.exports = {
  template: require('./login.html'),
  controller: ['$log', '$location', 'authService', LoginController],
  controllerAs: 'loginCtrl'
}

function LoginController($log, $location, authService) {
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
}
