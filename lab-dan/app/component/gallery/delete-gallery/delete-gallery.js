'use strict'

require('./delete-gallery.scss')

module.exports = {
  template: require('./delete-gallery.html'),
  controller: ['$log', '$scope', 'galleryService', DeleteGalleryController],
  controllerAs: 'deleteGalleryCtrl',
  bindings: {
    gallery: '<'
  }
}

function DeleteGalleryController ($log, $scope, galleryService) {
  let self = this

  self.deleteGallery = function () {
    $log.debug('deleting gallery')
    galleryService
      .deleteGallery(self.gallery)
      .then( () => {
        $scope.$emit('hideDelete')
        // $location.url('/')
      })
  }

  self.cancel = function () {
    $scope.$emit('hideDelete')
  }

}
