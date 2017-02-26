'use strict'

require('./delete-gallery.scss')

module.exports = {
  template: require('./delete-gallery.html'),
  controller: ['$log', 'galleryService', DeleteGalleryController],
  controllerAs: 'deleteGalleryCtrl'
}

function DeleteGalleryController ($log, galleryService) {
  let self = this
  self.gallery = null

  self.deleteGallery = function () {
    galleryService
      .deleteGallery()
      .then( () => {
        self.gallery.name = null
        self.gallery.desc = null
        // $location.url('/')
      })
  }

  self.cancel = function () {
    galleryService.showDeleteForm = false
  }

}
