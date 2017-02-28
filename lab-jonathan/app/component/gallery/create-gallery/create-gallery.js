module.exports = {
  template: require('./create-gallery.html'),
  controller: ['$log', 'galleryService', CreateGalleryController],
  controllerAs: 'createGalleryCtrl'
};

function CreateGalleryController($log, galleryService) {
  $log.debug('CreateGalleryController');
  this.gallery = {};  //this may need to be an array?  or is it an objct oof arrays?

  this.createGallery = function() {
    galleryService.createGallery(this.gallery)
    .then(() => {
      this.gallery.name = null;
      this.gallery.desc = null;
    });
  };
};
