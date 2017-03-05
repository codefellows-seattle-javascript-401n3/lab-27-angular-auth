'use strict'

require('./gallery-pics.scss')

module.exports = {
  template: require('./gallery-pics.html'),
  controller: ['$log', '$scope', 'picService', GalleryPicsController],
  controllerAs: 'galleryPicsCtrl',
  bindings: {
    gallery: '<'
  }
}

function GalleryPicsController ($log, $scope, picService) {
  let self = this
  self.pics = []

  self.$onInit = () => {
    $log.debug('GalleryPicsCtrl init')
    $log.debug(self.gallery)
    self.fetchPics()
  }

  self.fetchPics = function () {
    $log.debug('called fetchPics')
    picService
      .getPics(self.gallery)
      .then( pics => {
        self.pics = pics
      })
  }

}
