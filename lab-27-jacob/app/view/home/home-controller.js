'use strict';

require('./_home.scss');

module.exports = ['$log', '$location', 'authService', 'galleryService', HomeController];


function HomeController($log, $location, authService, galleryService) {
  $log.debug('HomeController');
  this.logOut = function() {
    authService.logout()
    .then(() => $location.url('/join/signup'));
  };

  this.galleries = galleryService.galleries;
}
