'use strict'

require('./update-pic.scss')

module.exports = {
  template: require('./update-pic.html'),
  controller: ['$log', '$scope', 'picService', UpdatePicController],
  controllerAs: 'updatePicCtrl',
  bindings: {
    pic: '<'
  }
}

function UpdatePicController ($log, $scope, picService) {
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
