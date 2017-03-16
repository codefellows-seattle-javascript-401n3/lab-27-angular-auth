'use strict';

module.exports = {
  template: require('./signup.html'),
  controller: ['$log', '$location', 'authService', SignupController],
  controllerAs: 'signupCtrl'
};

function SignupController($log, $location, authService){
  $log.debug('SignupController stuff');

  authService.getToken()
  .then( () => {
    $location.url('/home');
  });

  this.signup = function(user) {
    $log.debug('inside signupCtrl.signup() - will call authService.signup with a user from the html. will redirect to $location.url(/home)');

    authService.signup(user)
    .then(() => {
      $location.url('/home');
    });
  };
}
