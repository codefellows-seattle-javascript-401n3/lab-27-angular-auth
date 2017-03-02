'use strict'

require('./pic-item.scss')

module.exports = {
  template: require('./pic-item.html'),
  controller: ['$log', '$scope', 'picService', PicItemController],
  controllerAs: 'picViewCtrl',
  bindings: {
    gallery: '<'
  }
}

function PicViewController ($log, $scope, galleryService) {
  let self = this
  self.displayPics = false
  self.pics = []

  let hidePicsEvent = $scope.$on('hideUpdate', () => {
    return self.changeDisplayPicsStatus()
  })

  self.changeDisplayPicsStatus = function () {
    $log.debug('update status updated')
    return self.displayPics = !self.displayPics
  }

  self.fetchPics = function () {
    picService
      .getPics(self.gallery)
      .then( pics => {
        self.pics = pics
      })
  }

}
