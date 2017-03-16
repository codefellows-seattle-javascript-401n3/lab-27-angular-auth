'use strict'

require('./update-gallery.scss')

module.exports = {
  template: require('./update-gallery.html'),
  controller: ['$log', '$scope', 'galleryService', UpdateGalleryController],
  controllerAs: 'updateGalleryCtrl',
  bindings: {
    gallery: '<'
  }
}

function UpdateGalleryController ($log, $scope, galleryService) {
  let self = this
  self.galleryUpdate = null

  self.$onInit = () => {
    // $log.debug(self.gallery)
    self.galleryUpdate = {
      _id: self.gallery._id,
      name: self.gallery.name,
      desc: self.gallery.desc
    }
  }

  self.updateGallery = function () {
    // $log.debug('update gallery called')
    // if (!self.galleryUpdate) return self.cancel()
    // self.galleryUpdate._id = self.gallery._id
    galleryService
      .updateGallery(self.galleryUpdate)
      .then( () => {
        $scope.$emit('hideUpdate')
        // self.gallery.name = null
        // self.gallery.desc = null
        // $location.url('/')
      })
  }

  self.cancel = function() {
    // $log.debug('cancel called')
    self.galleryUpdate = {
      _id: self.gallery._id,
      name: self.gallery.name,
      desc: self.gallery.desc
    }
    $scope.$emit('hideUpdate')
  }
}
