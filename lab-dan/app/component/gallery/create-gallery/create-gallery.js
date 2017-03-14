'use strict'

require('./create-gallery.scss')

module.exports = {
  template: require('./create-gallery.html'),
  controller: ['$log', 'galleryService', CreateGalleryController],
  controllerAs: 'createGalleryCtrl'
}

function CreateGalleryController ($log, galleryService) {
  let self = this
  self.gallery = null

  self.createGallery = function () {
    galleryService
      .createGallery(self.gallery)
      .then( () => {
        self.gallery.name = null
        self.gallery.desc = null
        // $location.url('/')
      })
  }
}
