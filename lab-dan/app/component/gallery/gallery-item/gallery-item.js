'use strict'

require('./gallery-item.scss')

module.exports = {
  template: require('./gallery-item.html'),
  controller: ['$log', '$scope', '$anchorScroll', '$location', 'galleryService', GalleryItemController],
  controllerAs: 'galleryItemCtrl',
  bindings: {
    gallery: '<'
  }
}

function GalleryItemController ($log, $scope, $anchorScroll, $location, galleryService) {
  let self = this
  self.displayUpdateForm = false
  self.displayDeleteForm = false
  self.displayPics = false

  let cancelUpdateEvent = $scope.$on('hideUpdate', () => {
    return self.changeUpdateDisplayStatus()
  })

  let cancelDeleteEvent = $scope.$on('hideDelete', () => {
    return self.changeDeleteDisplayStatus()
  })

  let hidePicsEvent = $scope.$on('hide pics', () => {
    return self.changeDisplayPicsStatus()
  })

  self.changeUpdateDisplayStatus = function () {
    return self.displayUpdateForm = !self.displayUpdateForm
  }

  self.changeDeleteDisplayStatus = function () {
    return self.displayDeleteForm = !self.displayDeleteForm
  }

  self.changeDisplayPicsStatus = function () {
    $log.debug('display status changed')
    // if (!self.displayPics) {
    //   if ($location.hash() !== self.gallery._id) {
    //     $location.hash(self.gallery._id)
    //   } else {
    //     $anchorScroll()
    //   }
    // }
    return self.displayPics = !self.displayPics
  }

}
