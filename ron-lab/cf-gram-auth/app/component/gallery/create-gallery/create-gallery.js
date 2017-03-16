'use strict';

module.exports = {
  template: require('./create-gallery.html'),
  controller: ['$log', 'galleryService', CreateGalleryController],
  controllerAs: 'createGalleryCtrl',
};

function CreateGalleryController($log, galleryService) {
  $log.debug('CreateGalleryController');

  this.gallery = {};

  this.createGallery = function() {
    galleryService.createGallery(this.gallery)
    .then( () => {
      this.gallery.name = null;
      this.gallery.desc = null;
    });
  };

  // this.deleteGallery = function() {
  //   $log.log('Ran the delete');
  //   galleryService.deleteGallery(this.gallery)
  //   .then( () => {
  //     delete this.gallery.name;
  //     delete this.gallery.desc;
  //     $log.log('inside the deleteGallery method.');
  //   });
  // };
}
