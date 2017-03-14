'use strict';

require('./_home.scss');

module.exports = ['$log', '$rootScope', 'galleryService', HomeController];

function HomeController($log, $rootScope, galleryService) {
  $log.debug('In the HomeController');
  this.today = new Date();
  this.galleries = [];
  console.log('this.galleries', this.galleries);

  this.fetchGalleries = function(){
    galleryService.fetchGalleries()
    .then(galleries => {
      this.galleries = galleries;
      console.log('this.galleries2', this.galleries);
    });
  };
  this.fetchGalleries();

  $rootScope.$on('$locationChangeSuccess', () =>{
    this.fetchGalleries();
  })
};
