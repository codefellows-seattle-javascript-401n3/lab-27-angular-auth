'use strict';

module.exports = {
  template: require('./singup.html'),
  controller: ['$log', '$location', 'authService', SignupController],
  controllerAs: 'signupCtrl',
};

function SignupController($log, $location, authService) {
  $log.debug('SignupController');

  authService.getToken()
  .then( () => {
    $location.url('./home');
  });

  this.signup = function(user) {
    $log.debug('signupCtrl.singup()');

    authService.singup(user)
    .then( () => {
      $location.url('/home');
    });
  };
}
