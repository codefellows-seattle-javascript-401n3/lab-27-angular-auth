'use strict'

require('./gallery-item.scss')

module.exports = {
  template: require('./gallery-item.html'),
  controller: ['$log', '$scope', 'galleryService', GalleryItemController],
  controllerAs: 'galleryItemCtrl',
  bindings: {
    gallery: '<'
  }
}

function GalleryItemController ($log, $scope, galleryService) {
  let self = this
  self.displayUpdateForm = false
  self.displayDeleteForm = false
  let cancelUpdateEvent = $scope.$on('hideUpdate', () => {
    self.changeUpdateDisplayStatus()
  })
  let cancelDeleteEvent = $scope.$on('hideDelete', () => {
    self.changeDeleteDisplayStatus()
  })

  self.changeUpdateDisplayStatus = function () {
    $log.debug('update status updated')
    return self.displayUpdateForm = !self.displayUpdateForm
  }

  self.changeDeleteDisplayStatus = function () {
    $log.debug('delete status updated')
    return self.displayDeleteForm = !self.displayDeleteForm
  }

}