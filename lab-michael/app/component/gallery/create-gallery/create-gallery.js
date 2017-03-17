'use strict';

require('./_create-gallery.scss');

module.exports = {
  template: require('./create-gallery.html'),
  controller: ['$log', 'galleryService', CreateGalleryController],
  controllerAs: 'createGalleryCtrl'
};

function CreateGalleryController($log, galleryService) {
  $log.debug('The CreateGalleryController');

  this.gallery = {};

  this.createGallery = function() {
    galleryService.createGallery(this.gallery)
    .then( () => {
      this.gallery.name = null;
      this.gallery.desc = null;
    });
  };
  this.deleteGallery = function() {
    galleryService.deleteGallery(this.gallery)
    .then( () => {
      return;
    });
  };
}
