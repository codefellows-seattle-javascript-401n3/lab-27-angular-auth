'use strict';

require('./_home.scss');

module.exports = ['$log', '$location', 'authService', HomeController];


function HomeController($log, $location, authService) {
  $log.debug('HomeController');
  this.logOut = function() {
    authService.logout()
    .then(() => $location.url('/join/signup'));
  };
}
