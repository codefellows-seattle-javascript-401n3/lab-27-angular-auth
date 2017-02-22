'use strict';

// require('./_login.scss');

module.exports = {
  template: '',
  controller: ['$log', '$location', 'authService', LogoutController],
  controllerAs: 'logoutCtrl'
};

function LogoutController($log, $location, authService) {
  $log.debug('LogoutController');

  authService.getToken()
  .then( () => {
    $location.url('/home');
  });

  this.logout = function() {
    $log.log('logoutCtrl.logout()');

    authService.logout(this.user)
    .then( () => {
      $location.url('/');
    });
  };
}
