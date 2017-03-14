module.exports = {
  template: require('./edit-gallery.html'),
  controller: ['$log', 'galleryService', EditGalleryController],
  controllerAs: 'editGalleryCtrl',
  bindings: {
    gallery: '<'
  }
};

function EditGalleryController($log, galleryService) {
  $log.debug('running EditGalleryController');

  this.updateGallery = function() {
    galleryService.updateGallery(this.gallery._id, this.gallery);
  };
};
