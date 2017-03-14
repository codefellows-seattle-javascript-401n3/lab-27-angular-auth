require('./_gallery-up.scss');

module.exports = {
  template: require('./gallery-up.html'),
  controller: ['$log', 'galleryService', GalleryUpController],
  controllerAs: 'galleryUpCtrl',
  bindings: {
    gallery: '<',
  },
};

function GalleryUpController($log, galleryService){
  $log.debug('running galleryUpCtrl');

  this.showEditGallery = false;

  this.deleteGallery = function(){
    galleryService.deleteGallery(this.gallery._id);
  };
};
