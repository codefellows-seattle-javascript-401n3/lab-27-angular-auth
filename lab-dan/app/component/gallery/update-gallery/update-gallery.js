'use strict'

require('./update-gallery.scss')

module.exports = {
  template: require('./update-gallery.html'),
  controller: ['$log', 'galleryService', UpdateGalleryController],
  controllerAs: 'updateGalleryCtrl'
}

function UpdateGalleryController ($log, galleryService) {
  let self = this
  self.gallery = null
  self.showUpdateForm = galleryService.showUpdateForm

  self.updateGallery = function () {
    galleryService
      .updateGallery(self.gallery)
      .then( () => {
        self.gallery.name = null
        self.gallery.desc = null
        // $location.url('/')
      })
  }

  self.cancel = function () {
    galleryService.showUpdateForm = false
  }

}
