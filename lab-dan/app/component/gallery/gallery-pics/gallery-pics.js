'use strict'

require('./gallery-pics.scss')

module.exports = {
  template: require('./gallery-pics.html'),
  controller: ['$log', '$scope', 'picService', 'authService', GalleryPicsController],
  controllerAs: 'galleryPicsCtrl',
  bindings: {
    gallery: '<'
  }
}

function GalleryPicsController ($log, $scope, picService, authService) {
  let self = this
  self.showUploadForm = false
  let hideUploadForm = $scope.$on('hide file upload', () => {
    self.changeUploadDisplayStatus()
  })

  self.hidePics = function () {
    $log.debug('hide pics called')
    $scope.$emit('hide pics')
  }

  self.changeUploadDisplayStatus = function () {
    return self.showUploadForm = !self.showUploadForm
  }

}
