'use strict';

require('./_upload-pic.scss');

module.exports = {
  template: require('./upload-pic.html'),
  controller: ['$log', 'picService', UploadPicController],
  controllerAs: 'uploadPicCtrl',
  bindings: {
    gallery: '<',
  }
};

function UploadPicController($log, picService){
  $log.debug('UploadPicController');

  this.pic = {};

  this.uploadPic = function() {
    console.log('gallery', this.gallery);
    console.log('pic', this.pic);
    console.log('name', this.pic.name);
    picService.uploadGalleryPic(this.gallery, this.pic)
    .then(() => {
      this.pic.name = null;
      this.pic.desc = null;
      this.pic.file = null;
    })
  }
}
